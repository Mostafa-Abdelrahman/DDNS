    const express = require('express');
    const {Web3} = require('web3');
    const fs = require('fs');
    const path = require('path');
    const { stringify } = require('querystring');

    const app = express();
    app.use(express.json());

    const web3 =  new Web3('http://127.0.0.1:8545');

    // Read and parse the contract JSON files
    const dnsContractData = JSON.parse(fs.readFileSync(path.join(__dirname, 'build/contracts/DNSContract.json'), 'utf8'));
    const dnsAbi = dnsContractData.abi;
    const dnsBytecode = dnsContractData.bytecode;

    // Deploy DNSContract
    let dnsContract;
    const deployDnsContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[1];
    web3.eth.defaultAccount = defaultAccount;

    dnsContract = new web3.eth.Contract(dnsAbi);
    const contractInstance = await dnsContract.deploy({ data: dnsBytecode, arguments: [web3.utils.toWei('0.1', 'ether')] })
        .send({ from: defaultAccount, gas: 5000000 });

    dnsContract.options.address = contractInstance.options.address;
    console.log('DNSContract deployed at:', dnsContract.options.address);
    console.log(`current-user-address:${defaultAccount}`)
    };

    // Deploy the contract on server start
    deployDnsContract();

    // API Endpoints

    // Register a new domain
    app.post('/register', async (req, res) => {
        const { domain, ip } = req.body;
    
        try {
        const gasEstimate = await dnsContract.methods.buyDomain(domain, ip)
            .estimateGas({ from: web3.eth.defaultAccount, value: web3.utils.toWei('0.1', 'ether') });
        const result = await dnsContract.methods.buyDomain(domain, ip)
            .send({ from: web3.eth.defaultAccount, value: web3.utils.toWei('0.1', 'ether'), gas: gasEstimate });
    
        res.json({ transactionHash: result.transactionHash });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });
    
    app.post('/update', async (req, res) => {
        const { domain, ip } = req.body;
    
        try {
        const gasEstimate = await dnsContract.methods.updateDomain(domain, ip)
            .estimateGas({ from: web3.eth.defaultAccount });
        const result = await dnsContract.methods.updateDomain(domain, ip)
            .send({ from: web3.eth.defaultAccount, gas: gasEstimate });
        res.json({ transactionHash: result.transactionHash });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });
    
    app.post('/transfer', async (req, res) => {
        const { domain, newOwner } = req.body;
    
        try {
        const gasEstimate = await dnsContract.methods.transferDomain(domain, newOwner)
            .estimateGas({ from: web3.eth.defaultAccount });
    
        const result = await dnsContract.methods.transferDomain(domain, newOwner)
            .send({ from: web3.eth.defaultAccount, gas: gasEstimate });
    
        res.json({ transactionHash: result.transactionHash });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });
    

    // Delete a domain
    app.post('/delete', async (req, res) => {
    const { domain } = req.body;

    try {
        const result = await dnsContract.methods.deleteDomain(domain)
        .send({ from: web3.eth.defaultAccount });

        res.json({ transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Get domain information
    app.get('/domain/:name', async (req, res) => {
    const { name } = req.params;
        console.log(name)
    try {
        const result = await dnsContract.methods.getDomainInfo(name).call();
        res.json({
        exists: result[0],
        owner: result[1],
        ip: result[2],
        //   expirationDate: result[3]
        });
    } catch (error) {
        res.status(500).json({ error: "erorr with the sending" });
    }
    });

    // Get all registered domains
    app.get('/domains', async (req, res) => {
    try {
        const result = await dnsContract.methods.getAllDomains().call();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Get the registration fee
    app.get('/fee', async (req, res) => {
    try {
        const result = await dnsContract.methods.getRegistrationFee().call();
        const StrResult=String(result)
        res.json({ fee: StrResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    app.listen(3000, () => {
    console.log('Server started on port 3000');
    });
