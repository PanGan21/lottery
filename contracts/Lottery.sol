pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    // only manager can pick a winner through modifier restricted
    function pickWinner() public restricted {
        // call helper random function
        uint index = random() % players.length;
        
        // transfer the balance of the contract to the winner
        players[index].transfer(this.balance);
        
        // reset the players array to be able to run a new Lottery
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}