import { CardanoWeb3 } from "cardano-web3-js" // importing cw3js

const app = async () => {
  const web3 = await CardanoWeb3.init()
  
  const tip = await web3.tip()
  console.log("tip:", tip)

  const tipFromKoiosExplorer = await web3.explorer.koios.GET("/tip")
  console.log("tipFromKoiosExplorer:", tipFromKoiosExplorer.data)

  const nftcdnMetadata = await web3.explorer.nftcdn.GET("/metadata/{fingerprint}", {
    params: {
      path: {
        fingerprint: "asset1zwa4chw9xm7xwk7g46ef94qsj28hmnd7qffhgx"
      }
    }
  })
  console.log("nftcdnMetadata:", nftcdnMetadata.data)
}

app() // executing async app