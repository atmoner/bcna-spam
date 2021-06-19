#!/usr/bin/env node

var fs = require('fs');
const cosmosjs = require("@cosmostation/cosmosjs");
var getJSON = require('get-json')

var myConf = process.argv.slice(2);
//console.log(myConf[0])

//let rawdata = fs.readFileSync('config.json');
let rawdata = fs.readFileSync(myConf[0]);
let config = JSON.parse(rawdata);

const mnemonic = config.mnemonic;
const validatorAddress = config.validatorAddress;
const chainId = config.chainId;
const bitCanna = cosmosjs.network(config.lcdUrl, chainId);
bitCanna.setBech32MainPrefix(config.prefix);
bitCanna.setPath("m/44'/118'/0'/0/0");
const address = bitCanna.getAddress(mnemonic);
const ecpairPriv = bitCanna.getECPairPriv(mnemonic);
const MessageMemo = config.memo;

var hackSeq = 0; // Set your sequence -1 // Edit, dont touche it

getJSON(config.lcdUrl + '/cosmos/auth/v1beta1/accounts/' + address, function(error, response) {
    logSeq(response.account.sequence - 1)
})

function logSeq(seq) {
    hackSeq = seq
    console.log(hackSeq)
}

function sendTx() {
    // Generate MsgSend transaction and broadcast
    bitCanna.getAccounts(address).then(data => {
        hackSeq = hackSeq + 1
        let stdSignMsg = bitCanna.newStdMsg({
            msgs: [{
                type: "cosmos-sdk/MsgSend",
                value: {
                    amount: [{
                        amount: String(1), // 6 decimal places (1000000 ubcna = 1 BCNA)
                        denom: config.denom
                    }],
                    from_address: address,
                    to_address: 'bcna1dwkhyqsgr6mxa2qf70rv5mpdch9vr345tsmlpm'
                }
            }],
            chain_id: chainId,
            fee: {
                amount: [{
                    amount: String(config.feeAmount),
                    denom: config.denom
                }],
                gas: String(config.gasLimit)
            },
            memo: MessageMemo,
            account_number: String(data.result.value.account_number),
            sequence: String(hackSeq)
            //sequence: String(data.result.value.sequence)
        });

        const signedTx = bitCanna.sign(stdSignMsg, ecpairPriv);
        bitCanna.broadcast(signedTx).then(response => console.log(response));
        //console.log(data.result.value.account_number)
    })
}

setInterval(sendTx, 250); // Milisecond
