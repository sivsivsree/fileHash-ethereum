// rinkeby.infura.io/v3/a605d13de09a4b3d9cce7a8c8ca9bc61
// address:0x592f72243453fC45109D302faF96640d00712C86
// privateKey:DE9B93ED488EA77E0CD9D4534EE0C4C6F4839492A51E056128A635D04803791A

const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
// const {interface,bytecode} = require('./compile');
// const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider(config.rpcURL));
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a605d13de09a4b3d9cce7a8c8ca9bc61'));
const output = require('./compile');


const deploy = async () => {

    var CONTRACT_FILE = './contracts/fileHash.sol'
    // var content = fs.readFileSync(CONTRACT_FILE).toString()
    // var input = {
    //     language: 'Solidity',
    //     sources: {
    //         [CONTRACT_FILE]: {
    //             content: content
    //         }
    //     },
    //     settings: {
    //         outputSelection: {
    //             '*': {
    //                 '*': ['*']
    //             }
    //         }
    //     }
    // };
    //
    //
    // var compiled = solc.compile(JSON.stringify(input));
    // var output = JSON.parse(compiled);

    var abi = output.contracts[CONTRACT_FILE]['FileHash'].abi;
    var bytecode = output.contracts[CONTRACT_FILE]['FileHash'].evm.bytecode.object;
    // console.log(bytecode);
    web3.eth.accounts.wallet.add("0X" + "DE9B93ED488EA77E0CD9D4534EE0C4C6F4839492A51E056128A635D04803791A");
    web3.eth.defaultAccount = "0x592f72243453fC45109D302faF96640d00712C86";

    let cont = await new web3.eth.Contract(abi).deploy({
        data: "0x" + bytecode,
        arguments: []
    });
    let gas = await cont.estimateGas({from: "0x592f72243453fC45109D302faF96640d00712C86"});

    console.log("Gas estimate:", gas, ", Gas expected:", gas);
    const result = await new web3.eth.Contract(abi)
        .deploy({data: "0x" + bytecode, arguments: []})
        .send({gas: gas, from: "0x592f72243453fC45109D302faF96640d00712C86"});

    console.log('The Contract deployed to ', result.options.address);

};

deploy();
