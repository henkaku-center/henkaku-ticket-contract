// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Administration.sol";

abstract contract MintManager is Administration {
    bool public mintable;

    function switchMintable() external onlyAdmins {
        mintable = !mintable;
    }
}
