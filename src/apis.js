import axios from "axios";

const getNonce = async (address) => {
  const nonce = axios
    .get(`http://localhost:8080/auth/${address}/nonce`)
    .then((res) => res.data);

  return nonce;
};

const signature = async (address, signature) => {
  axios
    .post(`http://localhost:8080/auth/${address}/signature`, {
      signature,
    })
    .then((res) => res.data);
};

export { getNonce, signature };
