# Предупреждение [Сервер]
- Методы будут работать в том случае, если сервер присутствует на мониторинге.

## Методы враппера
```js
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MzIwMzA3Mjk5MDY0MjE4NiIsInBlcm1zIjowLCJpYXQiOjE1NzcxMjE4NDZ9.Y5qSkDQhOLsLbE6tcyp9e4ua0FtCrN1ykBBe0rJ9TXo";
// API ключ можно получить на странице редактирования вашего бота

const SDC = require("@megavasiliy007/sdc-api");
const client = new SDC(apiKey);

/* Категория "Сервер":
    - guild | Получить информацию о сервере
    - guildPlace | Получить текущее место сервера на мониторинге
    - guildRated | Получить ID всех проголосовавших пользователей и их оценки
      [!] Для отправки запроса, укажите ID сервера для проверки
*/

client.guild("669961614434500620")
    .then((data) => {
        console.info(data);
        /* {
            "avatar": "a_8f05534e4f750cf535988ae8a91fe9ad",
            "lang": "ru",
            "name": "SD.Community",
            "desc": "Официальный сервер тех. поддержки проектов SD.C!",
            "invite": "https://discord.gg/8KKVhTU",
            "owner": "Dellyare#0720",
            "online": 135,
            "members": 1000,
            "bot": 1,
            "boost": 3,
            "status": 8,
            "upCount": 299,
            "tags": "communication, programming, community"
        } */
    });
    
client.guildPlace("669961614434500620")
    .then((data) => {
        console.info(data);
        /* {
            "place": 1
        } */
    });

client.guildRated("669961614434500620")
    .then((data) => {
        console.info(data);
        /* {
            "166610390581641217": 1,
            "178404926869733376": 1,
            "239387797457207297": -1,
            "271461767014645772": 1,
            "321705723216134154": 1
        } */
    });
    
/* Категория "Пользователь":
    - userRated | Получить ID всех серверов за которые проголосовал пользователь
      [!] Для отправки запроса, укажите ID пользователя для проверки
*/

client.userRated("178404926869733376")
    .then((data) => {
        console.log(data);
        /* {
            "312941937240047631": -1,
            "669961614434500620": 1,
            "640586112624230450": 1,
        } */
    });

/* Категория "Чёрный список":
    - warns | Проверить количество предупреждений у пользователя
      [!] Для отправки запроса, укажите ID пользователя для проверки
*/

client.warns("178404926869733376")
    .then((data) => {
        console.info(data);
        /* {
            "id": "178404926869733376",
            "type": "user",
            "warns": 2
        } */
    });

/* Категория "Боты":
    - setAutoPost | Автоматическая отправка статистики бота
      [!] Для отправки запроса, укажите клиент бота и интервал обновления в миллисекундах (по умолчанию стоит 30 минут)
      
    Пример использования метода находится ниже.
*/

const { Client } = require('discord.js');
const bot = new Client();

bot.once('ready', () => {
    client.setAutoPost(bot);
});

bot.login('токен-бота');
```
