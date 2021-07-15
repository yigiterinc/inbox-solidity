const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')  // Web3 is a constructor, each instance will connect to one network
const web3 = new Web3(ganache.provider())

let accounts;
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();


    // Use one of those free accounts to deploy the Contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        
    });
});