import { CardanoWeb3 } from "cardano-web3-js" // importing cw3js

const app = async () => {
  const web3 = await CardanoWeb3.init({ network: "preview" })
  const xprvKey = "xprv1mqxe3f9anrqpuwh80nypu5twu7m0fryp834p49es3x5wyln5heyys5lt2ezl2v4dsdc4uxeacfm0ugj2nj4jcjt9vjtjv8emnrv3ek0ksr9mfp82hzza3zfu8h30gmr9rxa6std89kmyylf2y55c0xmytsld3s4n"
  
  const account = web3.account.fromXprvKey(xprvKey)
  console.log("account config:", account.__config) // account config
  console.log("account state:", account.__state) // account state {utxo, balance, delegation, rewards}

  await account.updateState() // updating account state
  console.log("account state:", account.__state) // updated
}

app() // executing async app