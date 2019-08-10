// jshint esversion: 6
var request = require('request-promise-native');
const hostname = "https://api.server-discord.com";

function options(uri, token) {
    if(!uri) return console.error("❌ [OPTIONS] Ошибка в работе sdc-api | Не указан адрес метода");
    if(!token) return console.error("❌ [OPTIONS] Ошибка в работе sdc-api | Не указан API токен");

    return {
        uri: hostname + uri,
        qs: {
            dKey: token
        },
        headers: {
            'User-Agent': `NodeJS (sdc-api | ${uri} | ${token})`
        },
        json: true
    };
}

module.exports = function (token) {
	if(!token) return console.error("❌ Ошибка в работе sdc-api | Не указан API ключ");

	this.guild = (guildID) => request(
		options(guildID ? `/guild/${guildID}` : `/guild`, token)
	).then((r) => r, (e) => console.error("❌ Ошибка в работе sdc-api | ", e));

	this.guildplace = (guildID) => request(
		options(guildID ? `/guild/${guildID}/place` : `/guild/place`, token)
	).then((r) => r, (e) => console.error("❌ Ошибка в работе sdc-api | ", e));

	this.guildrated = (guildID) => request(
		options(guildID ? `/guild/${guildID}/rated` : `/guild/rated`, token)
	).then((r) => r, (e) => console.error("❌ Ошибка в работе sdc-api | ", e));

	this.userrated = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе sdc-api | Недостаточно аргументов");
		return request(
			options(`/user/${userID}/rated`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе sdc-api | ", e));
	};

	this.warns = (userID) => {
		if(!userID) return console.error("❌ Ошибка в работе sdc-api | Недостаточно аргументов");
        	return request(
			options(`/warns/${userID}`, token)
		).then((r) => r, (e) => console.error("❌ Ошибка в работе sdc-api | ", e));
    	};
};
// end.
