const config = require('config');
const Web3 = require('web3');
var CONTRACT_FILE = './contracts/fileHash.sol'
const output = require('./compile');

var interface = output.contracts[CONTRACT_FILE]['FileHash'].abi;

// const {interface, bytecode} = require('../deploy/compile');

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a605d13de09a4b3d9cce7a8c8ca9bc61'));

const certContract = new web3.eth.Contract(
    interface,
    config.contractAddress
);


const invoke = async (functionName, arguments) => {
    const methodName = "[invoke-ethereum] : " + functionName + " " + arguments;
    console.log(methodName);
    try {

        let tranRec, gas, payLoad, transaction;
        switch (functionName) {
            case "createFile":
                console.log("createFile tx")
                gas = await certContract.methods.createFile(arguments[0], arguments[1], arguments[2]).estimateGas({from: config.address});
                console.log("gas price", gas);

                payLoad = certContract.methods.createFile(arguments[0], arguments[1], arguments[2]).encodeABI();
                transaction = await web3.eth.accounts.signTransaction({
                    to: certContract.options.address,
                    value: '0x00',
                    gas: gas + 1000,
                    data: payLoad
                }, "0X" + config.pk);
                tranRec = await web3.eth.sendSignedTransaction(transaction.rawTransaction);

                break;

            case "updateFile":
                console.log("updateFile ")
                gas = await certContract.methods.updateFile(arguments[0], arguments[1], arguments[2], arguments[3]).estimateGas({from: config.address});
                console.log("gas price", gas);

                payLoad = certContract.methods.updateFile(arguments[0], arguments[1], arguments[2], arguments[3]).encodeABI();
                transaction = await web3.eth.accounts.signTransaction({
                    to: certContract.options.address,
                    value: '0x00',
                    gas: gas + 1000,
                    data: payLoad
                }, "0X" + config.pk);
                tranRec = await web3.eth.sendSignedTransaction(transaction.rawTransaction);

                break;


            case "provideAccess":
                console.log("provideAccess")
                gas = await certContract.methods.provideAccess(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]).estimateGas({from: config.address});
                console.log("gas price", gas);

                payLoad = certContract.methods.provideAccess(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]).encodeABI();
                transaction = await web3.eth.accounts.signTransaction({
                    to: certContract.options.address,
                    value: '0x00',
                    gas: gas + 1000,
                    data: payLoad
                }, "0X" + config.pk);
                tranRec = await web3.eth.sendSignedTransaction(transaction.rawTransaction);

                break;


        }
        console.log(functionName + " tx input:" + arguments);
        console.log(functionName + " tx:" + tranRec.transactionHash)

        return {success: true, tranRec: tranRec};

    } catch (e) {
        return {success: false, error: e};
    }


};

const query = async (functionName, arguments) => {
    const methodName = "[query-ethereum] : " + functionName + " " + arguments;
    console.log(methodName);
    try {

        let output;
        switch (functionName) {
            case "isFileValid":
                output = await certContract.methods
                    .isFileValid(arguments[0], arguments[1], arguments[2])
                    .call();

                break;

            case "getAccess":
                output = await certContract.methods
                    .getAccess(arguments[0], arguments[1], arguments[2], arguments[3])
                    .call();

                break;
        }
        console.log(functionName + " tx input:" + arguments)
        console.log(functionName + " tx return:" + output);


        return {access: output};

    } catch (e) {
        return {success: false, error: e};
    }


};

module.exports = {
    invoke: invoke,
    query: query
};

