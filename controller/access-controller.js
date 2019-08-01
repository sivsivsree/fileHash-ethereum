"use strict";
const config = require('config');

let trans = require('../transaction');
const access = async (req, res) => {
    const methodName = "[access] : " + JSON.stringify(req.body);
    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }

        if (req.body._email === null || req.body._email === undefined || req.body._email.trim().length === 0) {
            throw "email is required";
        }

        if (req.body._accessStr === null || req.body._accessStr === undefined || req.body._accessStr.length === 0) {
            throw "_accessStr is required, GIVE/REVOKE";
        }

        if (req.body._ass === null || req.body._ass === undefined || req.body._ass.length === 0) {
            throw "_ass is empty array , READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS";
        }


        req.body._ass.map((item, index) => {
            if (config.access[item] !== undefined) {
                req.body._ass[index] = config.access[item];
            } else {
                console.log(item, "error");

                throw 'NOT valid string, READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS '
            }
        });

        let tx = await trans.invoke("provideAccess", [req.body._filename, req.body._createdBy, req.body._email, req.body._accessStr, req.body._ass])
        res.send({
            success: true, data: {
                transactionHash: tx.tranRec.transactionHash,
                url: config.url + tx.tranRec.transactionHash
            }
        });

    } catch (e) {
        res.send({success: false, error: e});
    }

};


const getAccess = async (req, res) => {
    const methodName = "[getAccess] : " + JSON.stringify(req.body);

    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }

        if (req.body._email === null || req.body._email === undefined || req.body._email.trim().length === 0) {
            throw "email is required";
        }

        // if (req.body._ass === null || req.body._ass === undefined || req.body._ass.length === 0) {
        //     throw "_ass is empty array , READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS";
        // }

        req.body._ass = ["READ", "EDIT", "COPY", "SCREENSHOT", "WATERMARK", "SAVEAS"];

        req.body._ass.map((item, index) => {
            if (config.access[item] !== undefined) {
                req.body._ass[index] = config.access[item];
            } else {
                console.log(item, "error");

                throw 'NOT valid string, READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS '
            }
        });

        let output = [];
        for (let item of req.body._ass) {
            output.push({[config.access[item]]: await trans.query("getAccess", [req.body._filename, req.body._createdBy, req.body._email, item])})
        }

        res.send({
            success: true, data: output
        });

    } catch (e) {
        res.send({success: false, error: e});
    }

};


const createFile1 = async (req, res) => {
    const methodName = "[createFile] : " + JSON.stringify(req.body);
    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._createdAt === null || req.body._createdAt === undefined || req.body._createdAt.trim().length === 0) {
            throw "_createdAt is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }

        if (req.body._hash === null || req.body._hash === undefined || req.body._hash.trim().length === 0) {
            throw "_hash is required";
        }

        let tx = await trans.invoke("createFile", [req.body._filename, req.body._createdAt, req.body._createdBy, req.body._hash]);

        res.send({
            success: true, data: {
                transactionHash: tx.tranRec.transactionHash,
                url: config.url + tx.tranRec.transactionHash
            }
        });

    } catch (e) {
        res.send({success: false, error: e});
    }

};


const updateFile = async (req, res) => {
    const methodName = "[updateFile] : "+ JSON.stringify(req.body);
    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }
        if (req.body._updatedAt === null || req.body._updatedAt === undefined || req.body._updatedAt.trim().length === 0) {
            throw "_updatedAt is required";
        }
        if (req.body._updatedBy === null || req.body._updatedBy === undefined || req.body._updatedBy.trim().length === 0) {
            throw "_updatedBy is required";
        }

        if (req.body._hash === null || req.body._hash === undefined || req.body._hash.trim().length === 0) {
            throw "_hash is required";
        }

        let tx = await trans.invoke("updateFile", [req.body._filename, req.body._createdBy, req.body._updatedAt, req.body._updatedBy, req.body._hash]);

        res.send({
            success: true, data: {
                transactionHash: tx.tranRec.transactionHash,
                url: config.url + tx.tranRec.transactionHash
            }
        });

    } catch (e) {
        res.send({success: false, error: e});
    }

};


const isFileValid = async (req, res) => {
    const methodName = "[isFileValid] : "+ JSON.stringify(req.body);
    console.log(methodName);
    try {
        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }

        if (req.body._hash === null || req.body._hash === undefined || req.body._hash.trim().length === 0) {
            throw "_hash is required";
        }

        let output = await trans.query("isFileValid", [req.body._filename, req.body._createdBy, req.body._hash]);

        res.send({
            success: true, file: output.access ? "VALID" : "NOT VALID"
        });

    } catch (e) {
        res.send({success: false, error: e});
    }

};

module.exports = {
    access: access,
    getAccess: getAccess,
    createFile1: createFile1,
    updateFile: updateFile,
    isFileValid: isFileValid
};
