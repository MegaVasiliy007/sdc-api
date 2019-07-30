# sdc-api
Небольшой модуль-враппер который позволяет вам легко взаимодействовать с [Server-Discord API](https://docs.server-discord.com).

### Установка
```sh
$ npm i sdc-api
```

### Пример кода
```js
const SDC = require("sdc-api");
const client = new SDC("<API-ключ>");

// Проверка на варны
client.nikawarns("178404926869733376").then(a => {
  console.info(a);
    /* {
        "id": "178404926869733376",
        "type": "user",
        "warns": 1
    } */
});

// Получить текущее место сервера на мониторинге
client.guildplace("490865478756204551").then(a => {
  console.info(a);
    /* {
        "place": 199
    } */
});
```
Все методы модуля: **[клик](https://github.com/MegaVasiliy007/sdc-api/blob/master/METHODS.md)**.
