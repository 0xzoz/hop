import { Addresses } from './types'

export const addresses: Addresses = {
  bonders: ['0x81682250D4566B2986A2B33e23e7c52D401B7aB7'],
  bridges: {
    USDC: {
      ethereum: {
        l1CanonicalToken: '0xA46d09fd4B7961aE16D33122660f43726cB1Ff36',
        l1Bridge: '0xf89E134Ce2e83B535D3Cfa63a902375f993Fc0D2'
      },
      xdai: {
        l1CanonicalBridge: '0xA960d095470f7509955d5402e36d9DB984B5C8E2',
        l1MessengerWrapper: '0x03a7fa6c6603A7079c269dAFe601C1106fD328A8',
        l2CanonicalBridge: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
        l2CanonicalToken: '0x3b0977b9e563F63F219019616BBD12cB1cdFF527',
        l2Bridge: '0xbe5DC176D31f0838Fe4A2f81f0DDb7ce22A8DdAb',
        l2HopBridgeToken: '0x5420cbF7B2Ca1CDC23C25459AD5A1e54dDe7d776',
        l2AmmWrapper: '0xEe028139BD4C11C1FDdAfB69D24114624E0aAdab',
        l2SaddleSwap: '0x6fEd6dF9707d16d1186e333dDed95ee5DaCa6E1E',
        l2SaddleLpToken: '0xC888C7071F8B9d2c3b8034F1Da7cBd35595191BD',
        l1Amb: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
        l2Amb: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
        canonicalBridgeMaxPerTx: '10000'
      },
      optimism: {
        l1CanonicalBridge: '0xC48528a44f2D961D179D69434645E54ac85732a1',
        l1MessengerWrapper: '0x959c21F8490092EbD32E52713C10f8cAfcf17477',
        l2CanonicalBridge: '0x7B2ab06D22Cd230102215532928f60770376a2B3',
        l2CanonicalToken: '0x3b8e53B3aB8E01Fb57D0c9E893bC4d655AA67d84',
        l2Bridge: '0x0E72827bE46c9F2eA3ce5Dc8c667E9790a2C20cA',
        l2HopBridgeToken: '0xa36E84bC6d3fc021b5AFD9cc5d22315a31fD8c4A',
        l2AmmWrapper: '0xb3395d2311c875ce2ec8a4d34c8D5C15012748cB',
        l2SaddleSwap: '0xeED1e285306EEF0D8BAd52c160C6A042420b2045',
        l2SaddleLpToken: '0xE41C81F02840704234e0266B42A0F786Ad8474e9'
      }
    },
    DAI: {
      ethereum: {
        l1CanonicalToken: '0x436e3FfB93A4763575E5C0F6b3c97D5489E050da',
        l1Bridge: '0x8a1cb9552977D3d5b88385D529e698C7dbBf97e4'
      },
      xdai: {
        l1CanonicalBridge: '0xA960d095470f7509955d5402e36d9DB984B5C8E2',
        l1MessengerWrapper: '0x51c8644700323CF1a3181B706adD269d8A53C4BA',
        l2CanonicalBridge: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
        l2CanonicalToken: '0x6D2d8B29d92cab87a273e872FcC4650A64116283',
        l2Bridge: '0x97fE281d134420aafFa4babFb88eC7038F585413',
        l2HopBridgeToken: '0xD0e7825E67D66f3531EB0AC7664347c0D63e01d5',
        l2AmmWrapper: '0x958fE734fDDA9fce03FfbE94a616D4a2A643ced8',
        l2SaddleSwap: '0x885D10A9baF9714f3441C34d940B9f12409C0012',
        l2SaddleLpToken: '0x75f83659E3419cF17D4b8A55A3f43BD124eF29E2',
        l1Amb: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
        l2Amb: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
        canonicalBridgeMaxPerTx: '10000'
      },
      optimism: {
        l1CanonicalBridge: '0xC48528a44f2D961D179D69434645E54ac85732a1',
        l1MessengerWrapper: '0x2cb57494fB3890C754CED2296071F228CAEee35d',
        l2CanonicalBridge: '0x7B2ab06D22Cd230102215532928f60770376a2B3',
        l2CanonicalToken: '0xFB6528eFbEe8B900CeBf2c4Cf709b1EF36D46A60',
        l2Bridge: '0xdb7C63d1Cb01877A91e915056FfC07Ff5a38b202',
        l2HopBridgeToken: '0x98C4d14e3D43E114fE40B6c13B199AA8F702bC90',
        l2AmmWrapper: '0x34A5BE7add88633D56b4F002C6f9D8abD1703654',
        l2SaddleSwap: '0x742DDbF5f4C9F70bDB85d980282cfDF09387697B',
        l2SaddleLpToken: '0x7076AC95eBb2514A2b17aC761BF7bcB404B23829'
      }
    }
  }
}