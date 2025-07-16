// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public house = 0x73ec7C2fc4e4E26AcCF831DB6792C25Be68673E6;
    uint public drawInterval = 7 days;
    uint public lastDraw;
    uint public minBuy = 0.001 ether;

    struct Ticket {
        address player;
    }

    Ticket[] public tickets;
    mapping(address => uint) public ticketsCount;
    uint public totalETH;

    constructor() {
        lastDraw = block.timestamp;
    }

    function buyTickets() external payable {
        require(msg.value >= minBuy, "Min 0.001 ETH");
        uint numTickets = msg.value / minBuy;
        require(ticketsCount[msg.sender] + numTickets <= 100, "Max 100 tickets");

        for (uint i = 0; i < numTickets; i++) {
            tickets.push(Ticket(msg.sender));
            ticketsCount[msg.sender]++;
        }
        totalETH += msg.value;
    }

    function drawWinners() external {
        require(block.timestamp >= nextDrawTime(), "Too soon");
        require(tickets.length >= 5, "Not enough players");
        lastDraw = block.timestamp;

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
        return (lastDraw / 1 weeks + 1) * 1 weeks;
    }
}

// 0xB89B940A8Ba01E0E141b947b59aadcCaB83a4E6D - deployed contract address