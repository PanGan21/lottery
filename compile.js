const path = require("path");
const fs = require("fs");
const solc = require("solc");

// resolve the path of the contract
const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");

// read the content of the contract
const source = fs.readFileSync(lotteryPath, "utf8");

// export module and compile contract using solidity compiler and choose the contract we want
module.exports = solc.compile(source, 1).contracts[":Lottery"];
