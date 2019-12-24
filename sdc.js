var request = require('request-promise-native');
const hostname = "https://api.server-discord.com/v2";

module.exports = function (token) {
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");
	
	this.options = (uri, method = "GET", args = null) => {
		if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
		const optionsObj = {
			method: method,
    			uri: encodeURI(hostname + uri),
    			headers: {
				'User-Agent': `sdc-api/1.0.5 (${uri})`,
				'Authorization': 'SDC '+token
			},
    			json: true
  		};
		
		if(args !== null) optionsObj.form = args;
		return optionsObj;
	};

	this.guild = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e))
	};
	
	this.guildplace = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}/place`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e))
	};
	
	this.guildrated = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
		
		return request(this.options(`/guild/${guildID}/rated`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e))
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
	
	this.botStats = (botID, args = { servers: 0, shards: 0 }) => {
		if(!botID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID бота!");
		
		return request(this.options(`/bots/${botID}/stats`, 'POST', args))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};
};
