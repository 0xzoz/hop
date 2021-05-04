import { ethers, Contract } from 'ethers'
import fetch from 'node-fetch'
import { MaticPOSClient } from '@maticnetwork/maticjs'
import Web3 from 'web3'
import chalk from 'chalk'
import { erc20Abi, l1PolygonPosRootChainManagerAbi } from '@hop-protocol/abi'
import { goerli as addresses } from '@hop-protocol/addresses'
import { ETHEREUM, POLYGON } from 'src/constants'
import { config } from 'src/config'
import wallets from 'src/wallets'
import { wait } from 'src/utils'
import BaseWatcher from './helpers/BaseWatcher'
import queue from './helpers/queue'

class polygonBridgeWatcher extends BaseWatcher {
  l1Provider: any
  l2Provider: any
  l1Wallet: any
  l2Wallet: any
  chainId: number
  apiUrl: string

  constructor () {
    super({
      tag: 'polygonBridgeWatcher',
      logColor: 'yellow'
    })

    this.l1Provider = new ethers.providers.StaticJsonRpcProvider(
      'https://goerli.rpc.hop.exchange'
    )
    this.l2Provider = new ethers.providers.StaticJsonRpcProvider(
      'https://rpc-mumbai.maticvigil.com'
    )
    this.l1Wallet = new ethers.Wallet(config.bonderPrivateKey, this.l1Provider)
    this.l2Wallet = new ethers.Wallet(config.bonderPrivateKey, this.l2Provider)
    this.chainId = 5
    this.apiUrl = `https://apis.matic.network/api/v1/${
      this.chainId === 1 ? 'matic' : 'mumbai'
    }/block-included`
  }

  async start () {
    this.logger.log('started')
    this.started = true
    try {
      //const l1Wallet = wallets.get(ETHEREUM)
      //const tokenAddress = addresses.DAI.polygon.l2CanonicalToken

      const tokenSymbol = 'USDC'
      const l1RootChainAddress =
        addresses[tokenSymbol][POLYGON].l1PosRootChainManager
      const l2TokenAddress = '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1' // dummy erc20
      const l2Token = new Contract(l2TokenAddress, erc20Abi, this.l2Wallet)
      const l1RootChain = new Contract(
        l1RootChainAddress,
        l1PolygonPosRootChainManagerAbi,
        this.l2Wallet
      )

      const transactionHashes: any = {}
      l2Token
        .on(
          'Transfer',
          (sender: string, to: string, data: string, meta: any) => {
            const { transactionHash } = meta
            if (to === ethers.constants.AddressZero) {
              this.logger.debug(
                'received transfer event. tx hash:',
                transactionHash
              )
              transactionHashes[transactionHash] = meta
            }
          }
        )
        .on('error', this.logger.error)

      while (true) {
        if (!this.started) {
          return
        }
        try {
          for (let transactionHash in transactionHashes) {
            const { blockNumber: l2BlockNumber } = transactionHashes[
              transactionHash
            ]
            const isCheckpointed = await this.isCheckpointed(l2BlockNumber)
            if (!isCheckpointed) {
              continue
            }

            delete transactionHashes[transactionHash]
            this.logger.info('sending polygon canonical bridge exit tx')
            const tx = await this.sendTransaction(transactionHash, tokenSymbol)
            this.logger.info(
              'polygon canonical bridge exit tx:',
              chalk.bgYellow.black.bold(tx.hash)
            )
          }
        } catch (err) {
          this.logger.error('poll error:', err.message)
        }

        await wait(10 * 1000)
      }
    } catch (err) {
      this.logger.error('watcher error:', err.message)
    }
  }

  async stop () {
    this.started = false
  }

  async isCheckpointed (l2BlockNumber: number) {
    const url = `${this.apiUrl}/${l2BlockNumber}`
    const res = await fetch(url)
    const json = await res.json()
    return json.message === 'success'
  }

  @queue
  async sendTransaction (txHash: string, tokenSymbol: string) {
    const recipient = await this.l1Wallet.getAddress()
    const maticPOSClient = new MaticPOSClient({
      network: this.chainId === 1 ? 'mainnet' : 'testnet',
      maticProvider: new Web3.providers.HttpProvider(
        this.l2Provider.connection.url
      ),
      parentProvider: new Web3.providers.HttpProvider(
        this.l1Provider.connection.url
      ),
      posRootChainManager:
        addresses[tokenSymbol][POLYGON].l1PosRootChainManager,
      posERC20Predicate: addresses[tokenSymbol][POLYGON].l1PosErc20Predicate
    })

    const tx = await maticPOSClient.exitERC20(txHash, {
      from: recipient,
      encodeAbi: true
    })

    return this.l1Wallet.sendTransaction({
      to: tx.to,
      value: tx.value,
      data: tx.data,
      gasLimit: tx.gas
    })
  }
}
export default polygonBridgeWatcher
