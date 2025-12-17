import { Address, dataSource } from "@graphprotocol/graph-ts";

export function getPublicAllocatorAddress(): Address {
  const network = dataSource.network();

  if (network == "mainnet") {
    return Address.fromString("0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D");
  }
  if (network == "base") {
    return Address.fromString("0xA090dD1a701408Df1d4d0B85b716c87565f90467");
  }
  if (network == "celo") {
    return Address.fromString("0x3Fe12193D178B76BaF4e23a083A64e49ACDE3188");
  }
  if (network == "tac") {
    return Address.fromString("0x414247afcf1fE3b94C617e7E3A7adB81D8D3208F");
  }
  if (network == "sei") {
    return Address.fromString("0xD878509446bE2C601f0f032F501851001B159D6B");
  }
  if (network == "optimism") {
    return Address.fromString("0x0d68a97324E602E02799CD83B42D337207B40658");
  }
  if (network == "arbitrum-one") {
    return Address.fromString("0x769583Af5e9D03589F159EbEC31Cc2c23E8C355E");
  }
  if (network == "fraxtal") {
    return Address.fromString("0x37a888192165fC39884f87c64E2476BfD2C09675");
  }
  if (network == "ink") {
    return Address.fromString("0x85416891752a6B81106c1C2999AE1AF5d8Cd3357");
  }
  if (network == "matic") {
    return Address.fromString("0xfac15aff53ADd2ff80C2962127C434E8615Df0d3");
  }
  if (network == "scroll") {
    return Address.fromString("0x8a7f671E45E51dE245649Cf916cA0256FB8a9927");
  }
  if (network == "unichain") {
    return Address.fromString("0xB0c9a107fA17c779B3378210A7a593e88938C7C9");
  }
  if (network == "sonic") {
    return Address.fromString("0x6Cef2EDC70D87E8f1623f3096efF05d066E59B36");
  }
  if (network == "mode-mainnet") {
    return Address.fromString("0x6FF33615e792E35ed1026ea7cACCf42D9BF83476");
  }
  if (network == "corn") {
    return Address.fromString("0xDFde06e2B2A2D718eE5560b73dA4F830E56A2f10");
  }
  if (network == "hemi") {
    return Address.fromString("0x4107Ea1746909028d6212B315dE5fE9538F9eb39");
  }

  return Address.zero();
}
