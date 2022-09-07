import "./App.css";
import { getNonce, signature } from "./apis";
import Web3 from "web3";

const handleSignMessage = async (publicAddress, nonce) => {
  // Define instance of web3
  var web3 = new Web3(window.ethereum);
  return new Promise((resolve, reject) =>
    web3.eth.personal.sign(
      web3.utils.fromUtf8(`Nonce: ${nonce}`),
      publicAddress,
      (err, signature) => {
        if (err) return reject(err);
        return resolve({ publicAddress, signature });
      }
    )
  );
};

const checkEth = async () => {
  if (window.ethereum) {
    const address = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => res[0]);

    const nonce = await getNonce(address);

    const signMessage = await handleSignMessage(address, nonce);

    await signature(address, signMessage.signature);

    // const balance = await window.ethereum.request({ method: "eth_getBalance", params: [address, "latest"]  }, ).then((res) => ethers.utils.formatEther(res))
    // console.log(balance)
  } else {
    alert("install metamask extension!!");
  }
};

function App() {
  return (
    <div className="App">
      <button onClick={checkEth} class="enableEthereumButton">
        Enable Ethereum
      </button>
    </div>
  );
}

export default App;
