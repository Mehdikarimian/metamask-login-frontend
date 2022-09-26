import axios from "axios";

const getNonce = async (address) => {
  const nonce = axios
    .get(`https://api.stagemeta.dev/auth/${address}/nonce`)
    .then((res) => res.data);

  return nonce;
};

const signature = async (address, signature) => {
  axios
    .post(`https://api.stagemeta.dev/auth/${address}/signature`, {
      signature,
    })
    .then((res) => res.data);
};

export { getNonce, signature };
