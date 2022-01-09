const hotswap = require('hotswap');
const QRCode = require('qrcode');
const fs = require('fs');
const {Client} = require('whatsapp-web.js');
let commands = require('./commands');

const SESSION_FILE_PATH = './session.json';
let debuggingNextMessage = false;

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH);
}
const client = new Client({session: sessionData});

client.on('authenticated', (session) => {
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if(err){
            console.error(err);
        }
        console.log("Authenticated");
    })
});

client.on('qr', (qr) => {
    renderQR(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

function renderQR(qr){
    QRCode.toString(qr,{type:'terminal'}, function (err, url) {
      console.log(url);
    })
};

client.on('message', async msg => {
    commands(msg);
});

client.on('message_create', async msg => {
    if(require("./self.json")?(getSender(msg) == require("./self.json").number):false){
        msg.author = require("./self.json").id;
        commands(msg);
    }
});


function getSender(msg){
    return (msg.from.split("@")[0]).split("-")[0];
}