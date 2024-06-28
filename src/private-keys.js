import { CardanoWeb3 } from "cardano-web3-js" // importing cw3js

const app = async () => {
  const web3 = await CardanoWeb3.init()
  
  const mnemonic = web3.utils.keys.mnemonicGenerate()
  console.log("mnemonic:", mnemonic) // mnemonic: <mnemonic-phrase>

  const privateKey = web3.utils.keys.xprvKeyGenerate()
  console.log("privateKey:", privateKey) // privateKey: <private-key>
}

app() // executing async app