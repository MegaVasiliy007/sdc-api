/* jshint esversion: 6 */

const { version } = require('./package');
const { request, sendStat } = require('./request');

const isLib = (library, client) => {
  try {
    const lib = require.cache[require.resolve(library)];
    return lib && client instanceof lib.exports.Client;
  } catch (e) {
    return false;
  }
};

const isSupported = client => isLib('discord.js', client) || isLib('eris', client);

const paths = {
  hostname: "api.server-discord.com",
  botsPath: "https://bots.server-discord.com",
  github: "https://github.com/MegaVasiliy007/sdc-api"
};

/**
 * @author SDC
 * @module
 * @param {string} token
 */
module.exports = function (token) {
  if (!token) {
    console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");
    return;
  }

  /**
   * @function
   * @param {string} uri
   * @param {string} method
   * @returns {{path: string, headers: {Authorization: string, 'User-Agent': string}, hostname: string, method: string}|void}
   */
  let options = (uri, method = "GET") => {
    if (!uri) {
      console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");
      return;
    }

    return {
      method: method,
      hostname: paths.hostname,
      path: "/v2" + uri,
      headers: {
        'User-Agent': `sdc-api/${version} (${uri})`,
        'Authorization': 'SDC ' + token
      }
    };
  };

  /**
   * @function
   * @param {string} guildID
   * @returns {PromiseLike<Object>|Promise<Object>|void}
   */
  this.guild = (guildID) => {
    if (!guildID) {
      console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
      return;
    }

    return request(options(`/guild/${guildID}`))
      .then((r) => r)
      .catch((e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };

  /**
   * @function
   * @param {string} guildID
   * @returns {PromiseLike<Object>|Promise<Object>|void}
   */
  this.guildPlace = (guildID) => {
    if (!guildID) {
      console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
      return;
    }

    return request(options(`/guild/${guildID}/place`))
      .then((r) => r)
      .catch((e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };

  /**
   * @function
   * @param {string} guildID
   * @returns {PromiseLike<Object>|Promise<Object>|void}
   */
  this.guildRated = (guildID) => {
    if (!guildID) {
      console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");
      return;
    }

    return request(options(`/guild/${guildID}/rated`))
      .then((r) => r)
      .catch((e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };

  /**
   * @function
   * @param {string} userID
   * @returns {PromiseLike<Object>|Promise<Object>|void}
   */
  this.userRated = (userID) => {
    if (!userID) {
      console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
      return;
    }

    return request(options(`/user/${userID}/rated`))
      .then((r) => r)
      .catch((e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };

  /**
   * @function
   * @param {string} userID
   * @returns {PromiseLike<Object>|Promise<Object>|void}
   */
  this.warns = (userID) => {
    if (!userID) {
      console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");
      return;
    }

    return request(options(`/warns/${userID}`))
      .then((r) => r)
      .catch((e) => console.error("[sdc-api] Ошибка в работе | ", e));
  };

  /**
   * @function
   * @param client
   * @param {number} interval
   * @returns {number|void}
   */
  this.setAutoPost = (client, interval = 1800000) => {
    if (!client) {
      console.error("[sdc-api] Ошибка аргументов | Не указан клиент бота!");
      return;
    }
    if (!isSupported(client)) {
      console.error('[sdc-api] Ошибка аргументов | Библиотека бота не поддерживается! Пожалуйста, сообщите нам на GitHub:\n' + encodeURI(`${paths.github}/issues`));
      return;
    }
    if (interval && interval < 900000) {
      console.error("[sdc-api] Ошибка аргументов | Отправка статистики возможна не менее одного раза в 15 минут!");
      return;
    }

    sendStat(client, options(`/bots/${client.user.id}/stats`, 'POST'));
    return setInterval(() => sendStat(client, options(`/bots/${client.user.id}/stats`, 'POST')), interval);
  };
};
