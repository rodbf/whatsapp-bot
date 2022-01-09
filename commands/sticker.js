module.change_code = 1;

module.exports = {
	description:"envie uma imagem com esse comando para transormar em um sticker",
	process: async (msg, callback) => {
		if(msg.type == 'image'){
			const media = await msg.downloadMedia();
			msg.reply(media, msg.getChat().id, {sendMediaAsSticker: true});
			return;
		}
		msg.reply("Envie uma imagem com esse comando.");
	}
}