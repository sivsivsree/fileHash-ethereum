const fs = require('fs');
const solc = require('solc');
var CONTRACT_FILE = './contracts/fileHash.sol'
var content = fs.readFileSync(CONTRACT_FILE).toString()
var input = {
    language: 'Solidity',
    sources: {
        [CONTRACT_FILE]: {
            content: content
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};


var compiled = solc.compile(JSON.stringify(input));
var output = JSON.parse(compiled);
module.exports = output;


//console.log(solc.compile(src,1).contracts[':MultiSigWallet']);
