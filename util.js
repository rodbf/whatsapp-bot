module.change_code = 1;
const settings = require("./settings.json");

module.exports = {
	getCommand: getCommand,
	getOptions: getOptions,
	getSender: getSender,
	formatArgument: formatArgument
};

function getCommand(msg){
	return command = splitMsg(msg.body)[0];
}

function getOptions(msg){
	let options = splitMsg(msg.body);
	options.shift();
	return options;
}

async function getSender(msg){
	return await msg.getContact();
}

function formatArgument(str){
	return str.replace("\n\n","\n");
}

//---------------

function splitMsg(str){
	let split = str.match(/(?:[^\s"]+|"[^"]*")+/g);
	if(split){
		for(let i = 0; i < split.length; i++){
			split[i] = split[i].replace(/"/g,'');
		}
	}
	return split;
}