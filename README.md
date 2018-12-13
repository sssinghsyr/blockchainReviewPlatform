# Blockchain enabled Review platform



## Overview


## Dependencies

* ethereumjs-testrpc 
* web3@0.20.1
* solc


```
Unzip blockchainReviewPlatform Project Directory
> cd blockchainReviewPlatform
> npm install 
```

## Usage

After all dependancies are installed, run the `testrpc` service with:
```
node_modules/ethereumjs-testrpc/build/cli.node.js

> node_modules/.bin/testrpc node_modules/ethereumjs-testrpc/build/cli.node.js
```

Run the following commands to open the node console then deploy ReviewRecord contract to the ganache ethereum test chain

```
ReviewPlatform> node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> code = fs.readFileSync('ReviewRecord.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':reviewRecord'].interface)
> ReviewRecordContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':reviewRecord'].bytecode
> deployedContract = ReviewRecordContract.new(,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = ReviewRecordContract.at(deployedContract.address)
```

Interact with the contract via the html page attached, just open it in your browser. See Project Run part below.

## Credits

The credits for this application go to [maheshmurthy](https://gist.github.com/maheshmurthy).
