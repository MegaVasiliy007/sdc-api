// jshint esversion: 6
function message(type, argone, argtwo, argthree) {
    if(type === "error") {
        console.log("============================================");
        console.log(" ");
        console.log(`Ошибка: ${argone}`);
        console.log(`Код ошибки: ${argtwo}`);
        console.log(`Дополнительно: ${argthree}`);
        console.log(" ");
        console.log("============================================");
    }
    if(type === "info") {
        console.log("============================================");
        console.log(" ");
        console.log(`ID: ${argone}`);
        console.log(`Тип спамера: ${argtwo}`);
        console.log(`Предупреждений: ${argthree}`);
        console.log(" ");
        console.log("============================================");
    }
}

const sdcAPI = require("./index");
const client = new sdcAPI("pMes94lrZC");

client.warns("178404926869733376").then((res) => {
    if(res.error) return message("error", res.error.type, res.error.code, res.error.message);
    else return message("info", res.id, (res.type === "user") ? "Пользователь" : "Бот", res.warns);
});
