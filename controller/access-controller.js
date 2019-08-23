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

        if (req.body._fileID === null || req.body._fileID === undefined || req.body._fileID.trim().length === 0) {
            throw "fileID is required";
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

        let tx = await trans.invoke("provideAccess", [req.body._filename, req.body._fileID, req.body._createdBy, req.body._email, req.body._accessStr, req.body._ass])
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

        if (req.body._fileID === null || req.body._fileID === undefined || req.body._fileID.trim().length === 0) {
            throw "fileID is required";
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
            output.push({[config.access[item]]: await trans.query("getAccess", [req.body._filename, req.body._fileID, req.body._createdBy, req.body._email, item])})
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

        if (req.body._fileID === null || req.body._fileID === undefined || req.body._fileID.trim().length === 0) {
            throw "fileID is required";
        }

        if (req.body._createdAt === null || req.body._createdAt === undefined || req.body._createdAt.trim().length === 0) {
            throw "_createdAt is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }


        let tx = await trans.invoke("createFile", [req.body._filename, req.body._fileID, req.body._createdAt, req.body._createdBy]);

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
    const methodName = "[updateFile] : " + JSON.stringify(req.body);
    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._fileID === null || req.body._fileID === undefined || req.body._fileID.trim().length === 0) {
            throw "fileID is required";
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

        if (req.body._docAction === null || req.body._docAction === undefined || req.body._docAction.length === 0) {
            throw "_docAction is required";
        }

        req.body._docAction.map((item, index) => {
            if (config.access[item] !== undefined) {
                req.body._docAction[index] = config.access[item];
            } else {
                console.log(item, "error");

                throw 'NOT valid string, READ/EDIT/COPY/SCREENSHOT/WATERMARK/SAVEAS '
            }
        });


        let tx = await trans.invoke("updateFile", [req.body._filename, req.body._fileID, req.body._createdBy, req.body._updatedAt, req.body._updatedBy, req.body._docAction]);

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

const updateInfo = async (req, res) => {
    const methodName = "[getAccess] : " + JSON.stringify(req.body);

    console.log(methodName);

    try {

        if (req.body._filename === null || req.body._filename === undefined || req.body._filename.trim().length === 0) {
            throw "filename is required";
        }

        if (req.body._fileID === null || req.body._fileID === undefined || req.body._fileID.trim().length === 0) {
            throw "fileID is required";
        }

        if (req.body._createdBy === null || req.body._createdBy === undefined || req.body._createdBy.trim().length === 0) {
            throw "createdBy is required";
        }


        let countData = await trans.query("getUpdateInfoCount", [req.body._filename, req.body._fileID, req.body._createdBy]);

        const count = Number(countData.access);
        let output = [];
        for (let i = 0; i < count; i++) {
            let reso = await trans.query("getUpdateInfo", [req.body._filename, req.body._fileID, req.body._createdBy, i]);
            let obj = {
                "filename": req.body._filename,
                "fileID": req.body._fileID,
                "createdBy": req.body._createdBy,
                "updatedBy": reso.access.updatedBy,
                "updatedAt": reso.access.updatedAt,
                "actions":[]
            };
            for (let j = 0; j < reso.access.access_.length; j++) {

                obj.actions.push(config.access[reso.access.access_[j]]);

            }
            output.push(obj);

        }




        res.send({
            success: true,
            output: output
        });

    } catch (e) {
        console.log(e)
        res.send({success: false, error: e});
    }

};


module.exports = {
    access: access,
    getAccess: getAccess,
    createFile1: createFile1,
    updateFile: updateFile,
    updateInfo: updateInfo
};
