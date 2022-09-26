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
let address = null;

const checkEth = async () => {
  if (window.ethereum) {
    address = await window.ethereum
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

const sendEth = async () => {
  const transactionParameters = {
    // nonce: "0x00", // ignored by MetaMask
    to: "0x187283AC2794d4807c6152207e87c83033d7C2d6", // Required except during contract publications.
    from: address, // must match user's active address.
    value: Web3.utils.toHex(Web3.utils.toWei('0.01')) // Only required to send ether to the recipient from the initiating external account.
    // data:
    //   '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  // txHash is a hex string
  // As with any RPC call, it may throw an error
  if (window.ethereum) {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log(txHash);
  }
};

function App() {
  return (
    <div className="App">
      <button onClick={checkEth} class="enableEthereumButton">
        Enable Ethereum
      </button>

      <button onClick={sendEth} class="sendEthButton btn">
        Send Eth
      </button>
    </div>
  );
}

export default App;
