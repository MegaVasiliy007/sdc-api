var request = require('request-promise-native');
const hostname = "https://api.server-discord.com";

class Monitoring {
  constructor (token) {
	this.token = token;
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ.");
  }
  
  options (uri, method = "GET") {
	if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
	return {
		method: method,
    		uri: hostname + uri,
    		qs: {dKey: this.token},
    		headers: {'User-Agent': `sdc-api/2.0.0 (${uri} | ${this.token})`},
    		json: true
  	};
  }
  
  guild (guildID) {
  	return request(this.options(guildID ? `/guild/${guildID}` : `/guild`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
  }

  guildplace (guildID) {
    	return request(this.options(guildID ? `/guild/${guildID}/place` : `/guild/place`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
  }

  guildrated (guildID) {
    	return request(this.options(guildID ? `/guild/${guildID}/rated` : `/guild/rated`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
  }

  userrated (userID) {
	if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
		
	return request(this.options(`/user/${userID}/rated`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };
};

class Blacklist {
  constructor (token) {
  	this.token = token;
  	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ.");
  }
  
  options (uri, method = "GET") {
	if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
		
	return {
		method: method,
    		uri: hostname + uri,
    		qs: {dKey: this.token},
    		headers: {'User-Agent': `sdc-api/2.0.0 (${uri} | ${this.token})`},
    		json: true
  	};
  }

  warns (userID) {
	if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
    
	return request(this.options(`/warns/${userID}`))
		.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };
};

module.exports.Monitoring = Monitoring;
module.exports.Blacklist = Blacklist;
