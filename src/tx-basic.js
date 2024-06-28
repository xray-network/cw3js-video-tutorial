import { CardanoWeb3 } from "cardano-web3-js" // importing cw3js

const app = async () => {
  const web3 = await CardanoWeb3.init({ network: "preview" })
  const account = web3.account.fromXprvKey("xprv1mqxe3f9anrqpuwh80nypu5twu7m0fryp834p49es3x5wyln5heyys5lt2ezl2v4dsdc4uxeacfm0ugj2nj4jcjt9vjtjv8emnrv3ek0ksr9mfp82hzza3zfu8h30gmr9rxa6std89kmyylf2y55c0xmytsld3s4n")
  await account.updateState() // updating account state

  const tx = await web3
    .createTx()
    .setChangeAddress(account.__config.paymentAddress) // setting change address
    .addInputs(account.__state.utxos) // adding inputs
    .addOutputs([{
      address: "addr_test1qrnrqg4s73skqfyyj69mzr7clpe8s7ux9t8z6l55x2f2xuqra34p9pswlrq86nq63hna7p4vkrcrxznqslkta9eqs2nsmlqvnk",
    }])
    .applyAndBuild()

  const txHash = await tx
    .signWithAccount(account)
    .applyAndToJson() // signing and converting to JSON

  console.log(txHash) // signedTx
}

app() // executing async app