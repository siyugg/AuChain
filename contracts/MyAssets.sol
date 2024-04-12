// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.5.0/security/Pausable.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";


contract MyAsset is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.05 ether;
    uint256 public MAX_SUPPLY = 100;

    mapping(uint256 => ProductInfo) public tokenInfo;
    mapping(uint256 => address[]) public pastOwners;
    mapping(address => uint256[]) public pendingTransfersOut;
    mapping(address => uint256[]) public pendingTransfersIn;
    mapping(uint256 => TransferRequest) public transferRequests;

    event TokenMinted(address indexed to, uint256 indexed tokenId, string cid);
    event TransferInitiated(address indexed from, address indexed to, uint256 indexed tokenId);
    event TransferApproved(address indexed from, address indexed to, uint256 indexed tokenId);
    event TransferRequested(address indexed from, address indexed to, uint256 indexed tokenId);

    struct ProductInfo {
        uint256 id;
        address initialOwner;
        string cid;
    }

    struct PendingTransferOut {
        uint256 tokenId;
        address to;
    }

    struct PendingTransferIn {
        uint256 tokenId;
        address from;
    }

    // struct to store transfer requests
    struct TransferRequest {
        address from;
        address to;
        bool pending;
        bool accepted;
    }

   constructor() ERC721("MyNFT", "NFT") {
        _tokenIdCounter.increment();
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is zero");
        payable(owner()).transfer(address(this).balance);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    
    function safeMint(address to, string memory cid) public payable {
        require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");
        require(msg.value >= MINT_PRICE, "Not enough ether sent");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        tokenInfo[tokenId] = ProductInfo({
            id: tokenId,
            initialOwner: to,
            cid : cid
        });

        pastOwners[tokenId].push(to);
        emit TokenMinted(to, tokenId, cid);
    }

    // Function to initiate a transfer request
    function initiateTransfer(address to, uint256 tokenId) external {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");
        require(!transferRequests[tokenId].pending, "Transfer request already pending");

        // Store transfer request
        transferRequests[tokenId] = TransferRequest({
            from: msg.sender,
            to: to,
            pending: true,
            accepted: false
        });

        pendingTransfersOut[msg.sender].push(tokenId);
        pendingTransfersIn[to].push(tokenId);
        emit TransferRequested(msg.sender, to, tokenId);
    }


    function acceptTransfer(uint256 tokenId) external {
        TransferRequest storage request = transferRequests[tokenId];
        require(request.pending, "Transfer request not pending");
        require(request.to == msg.sender, "You are not the intended recipient");

        _transfer(request.from, request.to, tokenId);

        request.pending = false;
        request.accepted = true;

        _removeFromPendingTransfersOut(request.from, tokenId);
        _removeFromPendingTransfersIn(msg.sender, tokenId);
    }

    function rejectTransfer(uint256 tokenId) external {
        TransferRequest storage request = transferRequests[tokenId];
        require(request.pending, "Transfer request not pending");
        require(request.to == msg.sender, "You are not the intended recipient");

        address sender = request.from;
        delete transferRequests[tokenId];

        _removeFromPendingTransfersOut(sender, tokenId);
        _removeFromPendingTransfersIn(msg.sender, tokenId);
    }

    // Function to remove token ID from sender's pending transfers out
    function _removeFromPendingTransfersOut(address from, uint256 tokenId) private {
        uint256[] storage pendingOut = pendingTransfersOut[from];
        for (uint256 i = 0; i < pendingOut.length; i++) {
            if (pendingOut[i] == tokenId) {
                if (i != pendingOut.length - 1) {
                    // Move the last element to the position of the removed element
                    pendingOut[i] = pendingOut[pendingOut.length - 1];
                }
                pendingOut.pop();
                break;
            }
        }
    }

    // Function to remove token ID from recipient's pending transfers in
    function _removeFromPendingTransfersIn(address recipient, uint256 tokenId) private {
        uint256[] storage pendingIn = pendingTransfersIn[recipient];
        for (uint256 i = 0; i < pendingIn.length; i++) {
            if (pendingIn[i] == tokenId) {
                if (i != pendingIn.length - 1) {
                    // Move the last element to the position of the removed element
                    pendingIn[i] = pendingIn[pendingIn.length - 1];
                }
                pendingIn.pop();
                break;
            }
        }
    }

    function getPendingTransfersOut() external view returns (uint256[] memory) {
        return pendingTransfersOut[msg.sender];
    }

    function getPendingTransfersIn() external view returns (uint256[] memory) {
        return pendingTransfersIn[msg.sender];
    }

    function getCID(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: CID query for nonexistent token");
        return tokenInfo[tokenId].cid;
    }
    
    function viewOwners(uint256 tokenId) public view returns (address[] memory) {
        require(_exists(tokenId), "Token does not exist");
        return pastOwners[tokenId];
    }

    // Helper function to convert uint to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Override _transfer function to store past owners
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._transfer(from, to, tokenId);
        pastOwners[tokenId].push(from);
    }


    // ===== 5. Other Functions ===== //
     function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmUvKVg2gfdu8u2nvf5ZKDAU9r2QQPxeddbhNWee3ahPaF/";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}