var request = require('request-promise-native');
const hostname = "https://api.server-discord.com";

module.exports = function (token) {
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");
	
	this.options = (uri, method = "GET") => {
		if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
		return {
			method: method
    	uri: hostname + uri,
    	qs: {dKey: token},
    	headers: {'User-Agent': `sdc-api/1.0.2 (${uri} | ${token})`},
    	json: true
  	};
	};

	this.guild = (guildID) => request(this.options(guildID ? `/guild/${guildID}` : `/guild`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));

	this.guildplace = (guildID) => request(this.options(guildID ? `/guild/${guildID}/place` : `/guild/place`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));

	this.guildrated = (guildID) => request(this.options(guildID ? `/guild/${guildID}/rated` : `/guild/rated`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));

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
