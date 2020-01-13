import Web3 from "web3";

// const web3 = new Web3(window.ethereum);
// window.ethereum.enable();

const web3 = new Web3(window.web3.currentProvider);

export default web3;
