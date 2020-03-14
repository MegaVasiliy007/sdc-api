function message(type, argone, argtwo, argthree) {
  console.log("============================================");
  console.log(" ");
  if (type === "error") {
    console.log(`Ошибка: ${argone}`);
    console.log(`Код ошибки: ${argtwo}`);
    console.log(`Дополнительно: ${argthree}`);
  }
  if (type === "info") {
    console.log(`ID: ${argone}`);
    console.log(`Тип спамера: ${argtwo}`);
    console.log(`Предупреждений: ${argthree}`);
  }
  console.log(" ");
  console.log("============================================");
}

let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MzIwMzA3Mjk5MDY0MjE4NiIsInBlcm1zIjowLCJpYXQiOjE1NzcxMjE4NDZ9.Y5qSkDQhOLsLbE6tcyp9e4ua0FtCrN1ykBBe0rJ9TXo";
// API ключ можно получить на странице редактирования вашего бота

const SDC = require("../sdc");
const client = new SDC(apiKey);

client.warns("178404926869733376").then((res) => {
  if (res.error) return message("error", res.error.type, res.error.code, res.error.message);
  else return message("info", res.id, res.type === "user" ? "Пользователь" : "Сервер", res.warns);
});
