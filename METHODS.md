# Предупреждение [Сервер]
- Методы будут работать в том случае, если сервер присутствует на мониторинге.

## Методы враппера
```js
var apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MzIwMzA3Mjk5MDY0MjE4NiIsInBlcm1zIjowLCJpYXQiOjE1NzcxMjE4NDZ9.Y5qSkDQhOLsLbE6tcyp9e4ua0FtCrN1ykBBe0rJ9TXo";
// API ключ можно получить на странице редактирования вашего бота

const SDC = require("@megavasiliy007/sdc-api");
const client = new SDC(apiKey);

/* Категория "Сервер":
    - guild | Получить информацию о сервере
    - guildplace | Получить текущее место сервера на мониторинге
    - guildrated | Получить ID всех проголосовавших пользователей и их оценки
      [!] Для отправки запроса, укажите ID сервера для проверки
*/

client.guild("577798137230655508")
    .then((data) => {
        console.info(data);
        /* {
            "avatar": "a_8f05534e4f750cf535988ae8a91fe9ad",
            "lang": "ru",
            "name": "SD.Community",
            "desc": "Официальный сервер тех. поддержки проектов SD.C!",
            "invite": "https://discord.gg/bDum6sp",
            "owner": "OldManTV#7632",
            "online": 350,
            "members": 7600,
            "bot": 1,
            "boost": 3,
            "status": 8,
            "upCount": 299,
            "tags": "communication, programming, community"
        } */
    });
    
client.guildplace("577798137230655508")
    .then((data) => {
        console.info(data);
        /* {
            "place": 1
        } */
    });

client.guildrated("577798137230655508")
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
    - userrated | Получить ID всех серверов за которые проголосовал пользователь
      [!] Для отправки запроса, укажите ID пользователя для проверки
*/

client.userrated("178404926869733376")
    .then((data) => {
        console.log(data);
        /* {
            "312941937240047631": -1,
            "577798137230655508": 1,
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
    - botStats | Отправить данные о количестве серверов и шардов на мониторинг ботов
      [!] Для отправки запроса, укажите ID бота и объект с данными
*/

var options = {
    servers: bot.guilds.size,
    shards: bot.shards.size
};

client.botStats("464272403766444044", options)
    .then((data) => {
        console.log(data.status); // Вернёт "true", если всё успешно
    });
```
