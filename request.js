/* jshint esversion: 6 */

const botsPath = "https://bots.server-discord.com";
const { stringify } = require('querystring')
	, { request } = require('https')
;

/**
 * @function
 * @param {Object} params
 * @param {string} [postData]
 * @returns {Promise<Object>}
 */
function send(params, postData) {
	return new Promise((resolve, reject) => {
		let req = request(params, (res) => {
			res.setEncoding('utf8');
			res.on('data', (data) => resolve( JSON.parse(data) ));
		});

		req.on('error', reject);

		if(postData) req.write(postData);
		req.end();
	});
}

module.exports = {
	/**
	 * @function
	 * @param {Object} params
	 * @returns {Promise<Object>}
	 */
	request: (params) => {
		if(params.body) {
			let postData = stringify( params.body );
			params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			params.headers['Content-Length'] = Buffer.byteLength(postData);

			return send(params, postData);
		} else return send(params);
	},

	/**
	 * @function
	 * @param client
	 * @param {Object} opt
	 */
	sendStat: (client, opt) => {
		let data = { servers: 0, shards: 0 };

		if (client.shard && client.shard.count !== 1) data.shards = client.shard.count;
		else if (client.shards && client.shards.size !== 1) data.shards = client.shards.size;

		if (client.guilds.cache) data.servers = client.guilds.cache.size;
		else data.servers = client.guilds.size;

		opt.body = data;
		module.exports.request(opt)
			.then((r) => {
				if(r.error) return console.error("[sdc-api | Авто-пост] Ошибка в работе\n" + r.error.message);
				else return console.info("[sdc-api | Авто-пост] Статистика для " + client.user.tag + " опубликована на мониторинг.\n" + encodeURI(botsPath + "/" + client.user.id));
			}, (e) => console.error("[sdc-api | Авто-пост] Ошибка в работе | ", e));
	}
};