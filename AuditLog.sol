// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract AuditLog{

    event AuditLogged(
        uint256 indexed auditId,
        bytes32 auditHash,
        address indexed logger,
        uint256 timestamp
    );

    uint256 private _auditCounter;

    mapping(uint256 => bytes32) public auditHashes;


    function logAudit(bytes32 _auditHash) public returns (uint256) {
        uint256 newAuditId = _auditCounter;
        
        auditHashes[newAuditId] = _auditHash;
        
        emit AuditLogged(newAuditId, _auditHash, msg.sender, block.timestamp);
        
        _auditCounter++;
        
        return newAuditId;
    }


}