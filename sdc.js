var { version } = require('./package');
var request = require('request-promise-native');

const paths = {
	hostname: "https://api.server-discord.com/v2",
	botsPath: "https://bots.server-discord.com",
	github: "https://github.com/MegaVasiliy007/sdc-api"
};

const isLib = (library, client) => {
  try {
    const lib = require.cache[require.resolve(library)];
    return lib && client instanceof lib.exports.Client;
  } catch (e) {return false;}
};

const isSupported = client => isLib('discord.js', client) || isLib('eris', client);

const sendStat = (client, opt) => {
	let shards = 0;
	if (client.shard && client.shard.count !== 1) shards = client.shard.count;
  else if (client.shards && client.shards.size !== 1) shards = client.shards.size;
	
	return request(opt)
		.then((r) => {
			if(r.error) return console.error("[sdc-api | Авто-пост] Ошибка в работе\n" + r.error.message);
			else return console.info("[sdc-api | Авто-пост] Статистика для " + client.user.tag + " опубликована на мониторинг.\n" + encodeURI(paths.botsPath + "/" + client.user.id));
		}, (e) => console.error("[sdc-api | Авто-пост] Ошибка в работе | ", e));
}

module.exports = function (token) {
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");
	
	this.options = (uri, method = "GET", args = null) => {
		if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
		const optionsObj = {
			method: method,
			uri: encodeURI(paths.hostname + uri),
			headers: {
				'User-Agent': `sdc-api/${version} (${uri})`,
				'Authorization': 'SDC ' + token
			},
			json: true
		};
		
		if(args !== null) optionsObj.form = args;
		return optionsObj;
	};

	this.guild = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};
	
	this.guildplace = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}/place`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};
	
	this.guildrated = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}/rated`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	this.userrated = (userID) => {
		if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
		
		return request(this.options(`/user/${userID}/rated`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	this.warns = (userID) => {
		if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
    
		return request(this.options(`/warns/${userID}`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	this.setAutopost = (client, interval = 1800000) => {
		if(!client) return console.error("[sdc-api] Ошибка аргументов | Не указан клиент бота!");
		if(!isSupported(client)) return console.error('[sdc-api] Ошибка аргументов | Библиотека бота не поддерживается! Пожалуйста, сообщите нам на GitHub:\n' + encodeURI(`${paths.github}/issues`));
		
		if(interval && interval <= 900000) return console.error("[sdc-api] Ошибка аргументов | Отправка статистики возможна не менее одного раза в 15 секунд!");
		
		sendStat(client, this.options(`/bots/${client.user.id}/stats`, 'POST', { servers: client.guilds.size, shards }));
		return setInterval(() => sendStat(client, this.options(`/bots/${client.user.id}/stats`, 'POST', { servers: client.guilds.size, shards })), interval);
	};
};
