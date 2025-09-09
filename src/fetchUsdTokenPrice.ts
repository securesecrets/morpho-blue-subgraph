import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

import { ChainlinkPriceFeed } from "../generated/MorphoBlue/ChainlinkPriceFeed";

const fastUSD = Address.fromString(
  "0x37a4dD9CED2b19Cfe8FAC251cd727b5787E45269"
).toHexString();

const usdc = Address.fromString(
  "0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392"
).toHexString();

const wbtc = Address.fromString(
  "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c"
).toHexString();

const weth = Address.fromString(
  "0x160345fC359604fC6e70E3c5fAcbdE5F7A9342d8"
).toHexString();

const usdt = Address.fromString(
  "0x9151434b16b9763660705744891fA906F660EcC5"
).toHexString();

const solvBTC = Address.fromString(
  "0x541FD749419CA806a8bc7da8ac23D346f2dF8B77"
).toHexString();

const wsei = Address.fromString(
  "0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7"
).toHexString();

const usdPriceFeeds = new Map<string, string>()
  .set(
    fastUSD,
    Address.fromString(
      "0xBf3bA2b090188B40eF83145Be0e9F30C6ca63689"
    ).toHexString()
  )
  .set(
    usdc,
    Address.fromString(
      "0x2eE9A7d22482905e7bb5E0aD832Be0DdB4d5582f"
    ).toHexString()
  )
  .set(
    wbtc,
    Address.fromString(
      "0x49973FA847Fd57d879f48E4B8Fd5F968DafD5774"
    ).toHexString()
  )
  .set(
    weth,
    Address.fromString(
      "0xEFc092F9D1Fd756D6788C5E8c1043Ed7a7F423Df"
    ).toHexString()
  )
  .set(
    usdt,
    Address.fromString(
      "0xfBB68fC1445F73cc3296fb6Cef316EdAC53967b6"
    ).toHexString()
  )
  .set(
    solvBTC,
    Address.fromString(
      "0x4a784CB1e0b4c07AEf60f98c561f04b4414f44A2"
    ).toHexString()
  )
  .set(
    wsei,
    Address.fromString(
      "0x100c8e61aB3BeA812A42976199Fc3daFbcDD7272"
    ).toHexString()
  );

const ethPriceFeeds = new Map<string, string>();

const eurPriceFeeds = new Map<string, string>();

function fetchPriceFromFeed(feedAddress: Address): BigDecimal {
  const chainlinkPriceFeed = ChainlinkPriceFeed.bind(feedAddress);
  return chainlinkPriceFeed
    .latestRoundData()
    .getAnswer()
    .toBigDecimal()
    .div(
      BigInt.fromString("10")
        .pow(chainlinkPriceFeed.decimals() as u8)
        .toBigDecimal()
    );
}

export function fetchUsdTokenPrice(tokenAddress: Address): BigDecimal {
  if (usdPriceFeeds.has(tokenAddress.toHexString())) {
    const chainlinkPriceFeed = Address.fromString(
      usdPriceFeeds.get(tokenAddress.toHexString())
    );

    return fetchPriceFromFeed(chainlinkPriceFeed);
  }

  return BigDecimal.zero();
}
