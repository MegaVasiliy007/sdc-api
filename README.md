# sdc-api
Небольшой модуль-враппер который позволяет вам легко взаимодействовать с [Server-Discord API](https://docs.server-discord.com).

## Установка
```sh
$ npm i sdc-api
```

## Пример кода
### SDC Monitoring
```js
const SDC = require("sdc-api");
const monit = new SDC.Monitoring("<API-ключ>");

// Получить текущее место сервера на мониторинге
monit.guildplace("400215724184043530").then((a) => {
  console.info(a);
    /* {
      "place": 4
    } */
}).catch(console.warn);
```

### SDC Blacklist
```js
const SDC = require("sdc-api");
const bl = new SDC.Blacklist("<API-ключ>");

// Получить предупреждения пользователя
bl.warns("515516930400976908").then((a) => {
  console.info(a);
    /* {
      "id": "515516930400976908",
      "type": "user",
      "warns": 3
    } */
}).catch(console.warn);
```

Все методы модуля: **[клик](https://github.com/MegaVasiliy007/sdc-api/blob/master/METHODS.md)**.
