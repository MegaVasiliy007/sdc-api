/* jshint esversion: 6 */

const
	{ version } = require('./package'),
	{ request, sendStat } = require('./request'),
	paths = {
		hostname: "api.server-discord.com",
		botsPath: "https://bots.server-discord.com",
		github: "https://github.com/MegaVasiliy007/sdc-api"
	},
	isLib = (library, client) => {
		try {
			const lib = require.cache[require.resolve(library)];
			return lib && client instanceof lib.exports.Client;
		} catch (e) {return false;}
	},
	isSupported = client => isLib('discord.js', client) || isLib('eris', client);
	
module.exports = function (token) {
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");
	
	this.options = (uri, method = "GET") => {
		if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
		const optionsObj = {
			method: method,
			hostname: paths.hostname,
			path: "/v2" + uri,
			headers: {
				'User-Agent': `sdc-api/${version} (${uri})`,
				'Authorization': 'SDC ' + token
			}
		};

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
		
		if(interval && interval < 900000) return console.error("[sdc-api] Ошибка аргументов | Отправка статистики возможна не менее одного раза в 15 минут!");

		sendStat(client, this.options(`/bots/${client.user.id}/stats`, 'POST'));
		return setInterval(() => sendStat(client, this.options(`/bots/${client.user.id}/stats`, 'POST')), interval);
	};
};