// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title PayStream — Real-time salary streaming on HeLa
/// @notice Uses native HLUSD (no ERC20 token needed)
contract PayStream is Ownable, ReentrancyGuard {

    struct Stream {
        uint256 ratePerSecond;
        uint256 startTime;
        uint256 lastWithdrawTime;
        uint256 taxPercent;
        bool active;
        bool exists;
    }

    uint256 public treasuryBalance;
    uint256 public taxVaultBalance;
    uint256 public totalBonusesPaid;
    uint256 public treasuryDepositTime;
    uint256 public constant YIELD_RATE_BPS = 300; // 3% APY in basis points

    mapping(address => Stream) public streams;
    mapping(address => uint256) public bonusReceived;
    address[] public employeeList;

    event Deposit(address indexed sender, uint256 amount);
    event StreamCreated(address indexed employee, uint256 ratePerSecond);
    event StreamPaused(address indexed employee);
    event StreamResumed(address indexed employee);
    event StreamCancelled(address indexed employee, uint256 finalPayout);
    event Withdraw(address indexed employee, uint256 amount, uint256 tax);
    event TaxWithdrawn(uint256 amount);
    event BonusSent(address indexed employee, uint256 amount, string reason);

    constructor(address initialOwner) Ownable(initialOwner) {
        treasuryDepositTime = block.timestamp;
    }

    /// @notice Deposit native HLUSD into the treasury
    function deposit() external payable onlyOwner {
        require(msg.value > 0, "Amount must be > 0");
        treasuryBalance += msg.value;
        if (treasuryDepositTime == 0) treasuryDepositTime = block.timestamp;
        emit Deposit(msg.sender, msg.value);
    }

    /// @notice Send a bonus to an employee
    function sendBonus(address employee, uint256 amount, string calldata reason) external onlyOwner nonReentrant {
        require(employee != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");
        require(treasuryBalance >= amount, "Insufficient treasury");

        treasuryBalance -= amount;
        totalBonusesPaid += amount;
        bonusReceived[employee] += amount;

        (bool success, ) = payable(employee).call{value: amount}("");
        require(success, "Transfer failed");
        emit BonusSent(employee, amount, reason);
    }

    function createStream(address employee, uint256 ratePerSecond, uint256 taxPercent) external payable onlyOwner {
        require(employee != address(0), "Invalid employee address");
        require(!streams[employee].exists, "Stream already exists");
        require(taxPercent <= 100, "Tax cannot exceed 100%");

        streams[employee] = Stream({
            ratePerSecond: ratePerSecond,
            startTime: block.timestamp,
            lastWithdrawTime: block.timestamp,
            taxPercent: taxPercent,
            active: true,
            exists: true
        });
        employeeList.push(employee);
        
        // Gas Stipend: Transfer any attached native currency to the employee immediately
        if (msg.value > 0) {
            (bool success, ) = payable(employee).call{value: msg.value}("");
            require(success, "Gas stipend transfer failed");
        }

        emit StreamCreated(employee, ratePerSecond);
    }

    function pauseStream(address employee) external onlyOwner {
        require(streams[employee].exists, "Stream does not exist");
        require(streams[employee].active, "Stream already paused");
        
        _payout(employee);
        streams[employee].active = false;
        emit StreamPaused(employee);
    }

    function resumeStream(address employee) external onlyOwner {
        require(streams[employee].exists, "Stream does not exist");
        require(!streams[employee].active, "Stream already active");

        streams[employee].active = true;
        streams[employee].lastWithdrawTime = block.timestamp;
        emit StreamResumed(employee);
    }

    function cancelStream(address employee) external onlyOwner {
        require(streams[employee].exists, "Stream does not exist");
        
        uint256 payout = _payout(employee);
        delete streams[employee];
        
        emit StreamCancelled(employee, payout);
    }

    function getAccrued(address employee) public view returns (uint256) {
        Stream memory s = streams[employee];
        if (!s.exists || !s.active) return 0;
        return (block.timestamp - s.lastWithdrawTime) * s.ratePerSecond;
    }

    /// @notice Calculate yield accrued on treasury
    function getYieldAccrued() public view returns (uint256) {
        if (treasuryBalance == 0 || treasuryDepositTime == 0) return 0;
        uint256 elapsed = block.timestamp - treasuryDepositTime;
        return (treasuryBalance * YIELD_RATE_BPS * elapsed) / (365 days * 10000);
    }

    function withdraw() external nonReentrant {
        require(streams[msg.sender].exists, "No stream found");
        require(streams[msg.sender].active, "Stream is paused");
        _payout(msg.sender);
    }

    function _payout(address employee) internal returns (uint256) {
        uint256 accrued = getAccrued(employee);
        if (accrued == 0) return 0;

        require(treasuryBalance >= accrued, "Insufficient treasury balance");

        Stream storage s = streams[employee];
        s.lastWithdrawTime = block.timestamp;

        uint256 taxAmount = (accrued * s.taxPercent) / 100;
        uint256 netAmount = accrued - taxAmount;

        treasuryBalance -= accrued;
        taxVaultBalance += taxAmount;

        if (netAmount > 0) {
            (bool success, ) = payable(employee).call{value: netAmount}("");
            require(success, "Transfer failed");
        }
        
        emit Withdraw(employee, netAmount, taxAmount);
        return netAmount;
    }

    function withdrawTax() external onlyOwner {
        uint256 amount = taxVaultBalance;
        require(amount > 0, "No tax collected");
        taxVaultBalance = 0;
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");
        emit TaxWithdrawn(amount);
    }

    function getAllEmployees() external view returns (address[] memory) {
        return employeeList;
    }

    /// @notice Allow contract to receive native HLUSD
    receive() external payable {}
}
