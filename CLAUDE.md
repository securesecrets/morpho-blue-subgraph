# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Graph Protocol subgraph indexing the Morpho Blue lending protocol across 15+ EVM networks. Built with AssemblyScript (graph-ts) and deployed to Graph Studio and Goldsky. Tracks lending/borrowing, market creation, liquidations, MetaMorpho vault interactions, and Chainlink price feeds.

## Common Commands

```bash
yarn codegen                  # Generate types from ABIs + schema (runs automatically on postinstall)
yarn build:<network>          # Build for a specific network (e.g., yarn build:mainnet, yarn build:sei)
yarn deploy:studio:<network>  # Deploy to Graph Studio (e.g., yarn deploy:studio:base)
./deploy-all.sh <version>     # Batch deploy to multiple networks
yarn test                     # Run tests (matchstick-as)
yarn lint                     # ESLint check
yarn lint:fix                 # Fix lint issues
yarn format:fix               # Fix formatting (Prettier)
```

Network names for build/deploy: `mainnet`, `base`, `celo`, `scroll`, `optimism`, `arbitrum`, `polygon-pos`, `fraxtal`, `ink`, `unichain`, `sonic`, `mode`, `corn`, `hemi`, `tac`, `sei`.

Note: `build:arbitrum` uses network name `arbitrum-one`, `build:polygon-pos` uses `matic`, `build:mode` uses `mode-mainnet` internally — but the yarn script names use the simplified forms above.

## Architecture

**Event-driven model**: Blockchain events → Handler functions → SDK managers → GraphQL entities.

### Key Source Directories

- **`src/`** — Event handlers and core logic
- **`src/sdk/`** — Manager classes that encapsulate entity business logic
- **`src/initializers/`** — Entity creation/initialization for protocol, markets, Chainlink proxies
- **`src/utils/`** — Helpers for math, rates, liquidation incentives
- **`src/constants/`** — Chainlink feed address database
- **`abis/`** — Smart contract ABIs (MorphoBlue, MetaMorpho, ERC20, Chainlink, etc.)

### Core SDK Managers (`src/sdk/`)

- **DataManager** (`manager.ts`) — Central orchestrator: creates transactions, updates protocol metrics, manages interest rates/fees/revenue, triggers snapshots
- **PositionManager** (`position.ts`) — Tracks supplier/borrower/collateral positions and their lifecycle
- **SnapshotManager** (`snapshots.ts`) — Creates hourly/daily snapshots of market and account data
- **TokenManager** (`token.ts`) — Token entity management and USD price fetching via Chainlink
- **AccountManager** (`account.ts`) — Account entity management

### Event Handlers

- **`morpho-blue.ts`** — Core protocol events: AccrueInterest, Borrow, Supply, Withdraw, Repay, Liquidate, FlashLoan, CreateMarket, SetFee, etc.
- **`meta-morpho.ts`** — MetaMorpho vault events: Deposit, Withdraw, ReallocateSupply/Withdraw, SetCap, governance changes
- **`meta-morpho-factory.ts`** / **`meta-morpho-factory-v1.1.ts`** — Factory events that create new vault data sources
- **`public-allocator.ts`** — Public reallocation events
- **`chainlink.ts`** — Price feed update handlers

### Configuration

- **`subgraph.yaml`** — Defines data sources (contracts) and templates (dynamically created sources for MetaMorpho vaults and Chainlink feeds)
- **`networks.json`** — Contract addresses and start blocks per network. When adding a new network, add entries here for MorphoBlue, MetaMorphoFactory, MetaMorphoFactoryV11, and PublicAllocator
- **`schema.graphql`** — GraphQL schema following the Messari lending protocol standard. Core entities: LendingProtocol, Market, Token, Account, Position, plus MetaMorpho-specific entities

### Adding a New Network

1. Add contract addresses and start blocks to `networks.json`
2. Add `build:<network>` and `deploy:studio:<network>` scripts to `package.json`
3. Add network-specific token price mappings in `src/fetchUsdTokenPrice.ts` if needed
4. Add the network to CI matrix in `.github/workflows/ci.yml`

## Conventions

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint)
- Husky pre-commit hooks are configured
- Prettier with 80-char line width and import sorting (`@trivago/prettier-plugin-sort-imports`)
