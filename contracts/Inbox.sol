pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!


contract Inbox {
    string public message;

    function Inbox(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
