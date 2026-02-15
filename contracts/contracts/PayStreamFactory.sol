// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PayStream.sol";

contract PayStreamFactory {
    event PayStreamCreated(address indexed owner, address payStreamAddress);

    mapping(address => address[]) public userPayStreams;
    address[] public allPayStreams;

    function createPayStream() external returns (address) {
        PayStream newStream = new PayStream(msg.sender);
        address streamAddress = address(newStream);

        userPayStreams[msg.sender].push(streamAddress);
        allPayStreams.push(streamAddress);

        emit PayStreamCreated(msg.sender, streamAddress);

        return streamAddress;
    }

    function getUserPayStreams(address user) external view returns (address[] memory) {
        return userPayStreams[user];
    }
    
    function getAllPayStreams() external view returns (address[] memory) {
        return allPayStreams;
    }
}
