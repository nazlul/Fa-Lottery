// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata) external returns (bool upkeepNeeded, bytes memory performData);
    function performUpkeep(bytes calldata) external;
}

contract Lottery is KeeperCompatibleInterface {
    address public owner;
    address public house = 0x73ec7C2fc4e4E26AcCF831DB6792C25Be68673E6;
    uint public minBuy = 0.001 ether;
    uint public lastDraw;

    struct Ticket {
        address player;
    }

    Ticket[] public tickets;
    mapping(address => uint) public ticketsCount;
    uint public totalETH;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
        lastDraw = (block.timestamp / 1 weeks) * 1 weeks;
    }

    function buyTickets() external payable {
        require(msg.value >= minBuy);
        uint numTickets = msg.value / minBuy;
        require(ticketsCount[msg.sender] + numTickets <= 100);

        for (uint i = 0; i < numTickets; i++) {
            tickets.push(Ticket(msg.sender));
            ticketsCount[msg.sender]++;
        }
        totalETH += msg.value;
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = (block.timestamp >= nextDrawTime() && tickets.length >= 5);
        performData = bytes("");
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata) external override {
        require(block.timestamp >= nextDrawTime());
        require(tickets.length >= 5);
        lastDraw = nextDrawTime();

        uint seed = uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));
        address[5] memory winners;
        for (uint i = 0; i < 5; i++) {
            uint idx = seed % tickets.length;
            winners[i] = tickets[idx].player;
            seed = uint(keccak256(abi.encodePacked(seed, idx, i)));
        }

        uint ethPool = totalETH * 95 / 100;
        payable(winners[0]).transfer(ethPool * 50 / 100);
        payable(winners[1]).transfer(ethPool * 20 / 100);
        payable(winners[2]).transfer(ethPool * 15 / 100);
        payable(winners[3]).transfer(ethPool * 5 / 100);
        payable(winners[4]).transfer(ethPool * 5 / 100);
        payable(house).transfer(address(this).balance);

        delete tickets;
        totalETH = 0;
    }

    function nextDrawTime() public view returns (uint) {
        return (block.timestamp / 1 weeks + 1) * 1 weeks;
    }

    function withdraw(uint amount) external onlyOwner {
        payable(owner).transfer(amount);
    }
}

// 0x92cE9853F943106EeeA5b29fC9b4888b1fA989bD contract address