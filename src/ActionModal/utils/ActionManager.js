import Cosmos from "@rnssolution/color-api"
import config from "src/config"
import { getSigner , getSignSigner} from "./signer"
import transaction from "./transactionTypes"
import { uatoms } from "scripts/num.js"
import { signWithPrivateKeywallet,getStoredWallet,verifySignature } from "@rnssolution/color-keys"
import b32 from "scripts/b32"

export default class ActionManager {
  constructor() {
    this.context = null
    this.cosmos = null
    this.message = null
  }

  setContext(context = null) {
    if (!context) {
      throw Error("Context cannot be empty")
    }
    this.context = context
    this.cosmos = new Cosmos(this.context.url || "", this.context.chainId || "")
  }

  readyCheck() {
    if (!this.context) {
      throw Error("This modal has no context.")
    }

    if (!this.context.connected) {
      throw Error(
        `Currently not connected to a secure node. Please try again when Color Wallet has secured a connection.`
      )
    }

    if (!this.message) {
      throw Error(`No message to send.`)
    }
  }

  messageTypeCheck(msgType) {
    if (!msgType) {
      throw Error("No message type present.")
    }

    const isKnownType = Object.values(transaction).includes(msgType)
    if (!isKnownType) {
      throw Error(`Invalid message type: ${msgType}.`)
    }
  }

  setMessage(type, transactionProperties) {
    if (!this.context) {
      throw Error("This modal has no context.")
    }

    this.messageTypeCheck(type)
    this.messageType = type
    this.message = this.cosmos[type](
      this.context.userAddress,
      transactionProperties
    )
  }

  setSignMessage(transactionProperties) {
    if (!this.context) {
      throw Error("This modal has no context.")
    }
    function temp(a){
      return a
    }
    this.message = temp(transactionProperties)
    
  }

  async simulate(memo) {
    this.readyCheck()
    const gasEstimate = await this.message.simulate({
      memo: memo
    })
    return gasEstimate
  }

  async send(memo, txMetaData) {
    this.readyCheck()

    const { gasEstimate, gasPrice, submitType, password } = txMetaData
    const signer = getSigner(config, submitType, {
      address: this.context.userAddress,
      password
    })

    if (this.messageType === transaction.WITHDRAW) {
      this.message = this.createWithdrawTransaction()
    }

    const { included, hash } = await this.message.send(
      {
        gas: String(gasEstimate),
        gasPrices: convertCurrencyData([gasPrice]),
        memo
      },
      signer
    )
     
    return { included, hash }
  }

  async sendSign(txMetaData) {

    const { Message,submitType, password } = txMetaData
    const wallet = getStoredWallet(this.context.userAddress, password)
    const message = [
      { 
        signMessage: { 
          message : Message
        } 
      }
    ]
    var  hash  = signWithPrivateKeywallet(
      message[0].signMessage,
      Buffer.from(wallet.privateKey, 'hex')
    )
    hash = hash.toString('base64')
    return hash 
  }

  async verify(txMetaData) {
    const { Message, PublicAddress,PrivateKey,password } = txMetaData
    const wallet = getStoredWallet(this.context.userAddress,password)

    const message = [
      { 
        signMessage: { 
          message : Message
        } 
      }
    ]
    
    // const pub = wallet.publicKey
    // console.log(Buffer.from(pub, 'base64'))
    // console.log(wallet.publicKey,"=================")

    // console.log(Buffer.from(pub, 'hex'),"55555555555555555")
    // console.log(pub.length,"111111111111111111111111111111")
    
    // const hexAddr = b32.decode('colors1uqgl880nd4avks2rftes0y9x8wftqy8q3ndzqt')
    // console.log(hexAddr,"+++++++++++++++++++")

    // console.log(hexAddr.length,"22222222222222222222222222")
    // console.log(Buffer.from(hexAddr, 'utf-8'),"utf-8")
    // console.log(Buffer.from(hexAddr, 'hex'),"hex")
    // console.log(Buffer.from(hexAddr, 'base64'),"base64")


    // console.log(Buffer.from(pub.substr(26,pub.length), 'hex'),"substr")
    // const pubdecode = b32.encode('02d807e18ad473b6b7fecd14e45b0c5a336f9c2fc7f2c0c48a04d9d2e57b54b67d')
    // console.log(pubdecode,"33333333333333333")
    // console.log(pubdecode.length,"4444444444444444444")

    var  verify  = verifySignature(
      message[0].signMessage,
      Buffer.from(PrivateKey, 'base64'),
      Buffer.from(wallet.publicKey, 'hex')
    )
    
    return verify 
  }


  createWithdrawTransaction() {
    const addresses = getTop5RewardsValidators(
      this.context.bondDenom,
      this.context.rewards
    )
    return this.createMultiMessage(
      transaction.WITHDRAW,
      this.context.userAddress,
      { validatorAddresses: addresses }
    )
  }

  // Withdrawing is a multi message for all validators you have bonds with
  createMultiMessage(type, senderAddress, { validatorAddresses }) {
    const messages = validatorAddresses.map(validatorAddress =>
      this.cosmos[type](senderAddress, { validatorAddress })
    )
    return this.cosmos.MultiMessage(senderAddress, messages)
  }
}

function convertCurrencyData(amounts) {
  return amounts.map(({ amount, denom }) => ({
    amount: toMicroAtomString(amount),
    denom
  }))
}

function toMicroAtomString(amount) {
  return String(uatoms(amount))
}

// // limitation of the block, so we pick the top 5 rewards and inform the user.
function getTop5RewardsValidators(bondDenom, rewardsObject) {
  // Compares the amount in a [address1, {denom: amount}] array
  const byBalanceOfDenom = denom => (a, b) => b[1][denom] - a[1][denom]
  const validatorList = Object.entries(rewardsObject)
    .sort(byBalanceOfDenom(bondDenom))
    .slice(0, 5) // Just the top 5
    .map(([address]) => address)

  return validatorList
}
