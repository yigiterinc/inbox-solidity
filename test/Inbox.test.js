const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')  // Web3 is a constructor, each instance will connect to one network
const web3 = new Web3(ganache.provider())

const { interface, bytecode } = require('../compile')

let accounts;
let inbox;

let methods;

const INITIAL_STRING = 'Hi there';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those free accounts to deploy the Contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                              .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // creates a deployable object
                              .send({ from: accounts[0], gas: '1000000' }); // sets the account from and gas limit to create tx.

    methods = inbox.methods;
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);   // if not null or undefined it will succeed (truthy)
    });

    it('sets a default message', async () => {
        const message = await methods.message().call();
        assert.strictEqual(message, INITIAL_STRING);
    })
    
    it('can change the message', async () => {
        const test_message = "bye there!"
        await methods.setMessage(test_message).send({ from: accounts[0] });   // to update a value, we have to send a transaction
        const message = await methods.message().call();
        assert.strictEqual(message, test_message);
    })

});

https://rinkeby.infura.io/v3/1210400c89b94e5e845dc3f00bf181eb