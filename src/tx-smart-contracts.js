import { CardanoWeb3 } from "cardano-web3-js" // importing cw3js

const app = async () => {
  const web3 = await CardanoWeb3.init({ network: "preview" })
  const account = web3.account.fromXprvKey("xprv1mqxe3f9anrqpuwh80nypu5twu7m0fryp834p49es3x5wyln5heyys5lt2ezl2v4dsdc4uxeacfm0ugj2nj4jcjt9vjtjv8emnrv3ek0ksr9mfp82hzza3zfu8h30gmr9rxa6std89kmyylf2y55c0xmytsld3s4n")
  await account.updateState() // updating account state
  
  /* Deposit to contract */
  const datum = web3.Data.void() // creating empty datum
  const alwaysSucceedScript = {
    language: "PlutusV2",
    script: "480100002221200101",
  } // plutus always succeed script, pre-compiled
  const scriptAddress = web3.utils.script.scriptToAddress(alwaysSucceedScript)
  const txDeposit = await web3
    .createTx()
    .setChangeAddress(account.__config.paymentAddress) // setting change address
    .addInputs(account.__state.utxos) // adding inputs
    .payToContract(
      {
        address: scriptAddress,
        value: 1_000_000n, // 1 ADA
      },
      {
        type: "inline",
        datum,
      }
    )
    .applyAndBuild()

    const txDepositSigned = await txDeposit
      .signWithAccount(account)
      .applyAndToJson()

    console.log("txDepositSigned:", txDepositSigned.tx) // signedTx


  /* Collect from contract */
  // const redeemer = web3.Data.void() // creating empty redeemer
  // const alwaysSucceedScript = {
  //   language: "PlutusV2",
  //   script: "480100002221200101",
  // } // plutus always succeed script, pre-compiled
  // const scriptAddress = web3.utils.script.scriptToAddress(alwaysSucceedScript) // converting script to address
  
  // const scriptAddressUtxos = await web3.provider.getUtxosByAddress(scriptAddress) // fetching utxos by address from script address
  // const utxoReference = scriptAddressUtxos.find(utxo => utxo.scriptHash) // finding utxo with script
  // const utxoToCollect = scriptAddressUtxos.find(utxo => utxo.datumType === "inline")

  // const txCollect = await web3
  //   .createTx()
  //   .setChangeAddress(account.__config.paymentAddress) // setting change address
  //   .addInputs(account.__state.utxos) // adding inputs
  //   .readFrom([utxoReference]) // reading script from script address
  //   .collectFrom([utxoToCollect], redeemer) // collecting utxo
  //   .applyAndBuild()

  // const txCollectSigned = await txCollect
  //   .signWithAccount(account)
  //   .applyAndToJson() // signing and converting to JSON

  // console.log("txCollect:", txCollectSigned.tx) // txCollect
}

app() // executing async app