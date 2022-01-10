module.change_code = 1;

module.exports = {
	description:"envie uma imagem com esse comando para transormar em um sticker",
	process: async (msg, callback) => {
		console.log(msg);
		if(msg.hasMedia){
			console.log("hasMedia");
			const media = await msg.downloadMedia();
			console.log("checkpoint 1");
			msg.reply(media, msg.getChat().id, {sendMediaAsSticker: true});
			console.log("checkpoint 2");
			return;
		}
		msg.reply("Envie uma imagem com esse comando.");
	}
}