// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Administration.sol";
import "./MintManager.sol";
import "./interfaces/IHenkakuToken.sol";

abstract contract InteractCommunityToken is Administration, MintManager {
    address public communityToken;

    function _initializeInteractCommunityToken(address _communityToken) internal virtual initializer {
        communityToken = _communityToken;
    }

    function setCommunityToken(address _communityToken) external onlyAdmins {
        communityToken = _communityToken;
    }

    function _batchTransferCommunityToken(
        uint256 totalAmount,
        uint256[] memory _amounts,
        address[] memory _to
    ) internal {
        _checkCommunityTokenBalance(totalAmount);

        uint256[] memory amounts = _amounts;
        uint256 amountsLength = amounts.length;
        require(amountsLength == _to.length, "amounts and to length mismatch");

        for (uint256 i = 0; i < amountsLength; ) {
            bool sent = IHenkakuToken(communityToken).transferFrom(msg.sender, _to[i], amounts[i]);
            require(sent, "Ticket: ERC20 Token transfer failed");

            unchecked {
                ++i;
            }
        }
    }

    function _checkCommunityTokenBalance(uint256 _requiredAmount) internal view {
        require(
            IHenkakuToken(communityToken).balanceOf(msg.sender) >= _requiredAmount,
            "Ticket: Insufficient ERC20 token"
        );
    }
}
