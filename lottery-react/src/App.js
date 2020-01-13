import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const fetchManager = async () => {
    const newManager = await lottery.methods.manager().call();
    console.log(newManager);
    setManager(newManager);
  };

  const fetchPlayers = async () => {
    const newPlayers = await lottery.methods.getPlayers().call();
    console.log("Players length: " + newPlayers.length);
    console.log("Players: " + newPlayers);
    setPlayers(newPlayers);
  };

  const fetchBalance = async () => {
    const newBalance = await web3.eth.getBalance(lottery.options.address);
    console.log("Balance: " + newBalance);
    setBalance(newBalance);
  };

  useEffect(() => {
    fetchManager();
    fetchPlayers();
    fetchBalance();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();

    setMessage("Waiting on transaction success...");

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether")
    });

    setMessage("You have been entered");
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage("A winner has been picked!");
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance)} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
};

export default App;
