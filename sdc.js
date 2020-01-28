var { version } = require('./package');
var request = require('request-promise-native');

const paths = {
	hostname: "https://api.server-discord.com/v2",
	botsPath: "https://bots.server-discord.com"
};

const isSupported = (client) => {
	if(client.guilds !== undefined || client.user !== undefined || client.users !== undefined) return true;
	else return false;
};

module.exports = function (token, client) {
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

	if(client) {
		if(isSupported(client)) {
			client.on('ready', () => {
				request(this.options(`/bots/${client.user.id}/stats`, 'POST', { servers: client.guilds.size, shards: ((client.shards == undefined) ? 0 : client.shards.size) }))
					.then((r) => {
						if(r.error) return console.error("[sdc-api | Авто-пост] Ошибка в работе\n" + r.error.message);
						else return console.info("[sdc-api | Авто-пост] Статистика для " + client.user.tag + " опубликована на мониторинг.\n" + encodeURI(paths.botsPath + "/" + client.user.id));
					}, (e) => console.error("[sdc-api | Авто-пост] Ошибка в работе | ", e));

				setInterval(() => {
					request(this.options(`/bots/${client.user.id}/stats`, 'POST', { servers: client.guilds.size, shards: ((client.shards == undefined) ? 0 : client.shards.size) }))
						.then((r) => {
							if(r.error) return console.error("[sdc-api | Авто-пост] Ошибка в работе\n" + r.error.message);
							else return console.info("[sdc-api | Авто-пост] Статистика для " + client.user.tag + " опубликована на мониторинг.\n" + encodeURI(paths.botsPath + "/" + client.user.id));
						}, (e) => console.error("[sdc-api | Авто-пост] Ошибка в работе | ", e));
				}, 900000);
			});
		} else return console.warn("[sdc-api | Авто-пост] Библиотека бота не поддерживается!");
	}

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
};