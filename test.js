function message(type, argone, argtwo, argthree) {
  console.log("============================================");
  console.log(" ");
  if (type == "error") {    
    console.log(`Ошибка: ${argone}`);
    console.log(`Код ошибки: ${argtwo}`);
    console.log(`Дополнительно: ${argthree}`);
  }
  if (type == "info") {
    console.log(`ID: ${argone}`);
    console.log(`Тип спамера: ${argtwo}`);
    console.log(`Предупреждений: ${argthree}`);
  }
  console.log(" ");
  console.log("============================================");
}

const sdcAPI = require("./index");
const client = new sdcAPI("KEY");

client.warns("178404926869733376").then((res) => {
  if (res.error) return message("error", res.error.type, res.error.code, res.error.message);
  else return message("info", res.id, res.type == "user" ? "Пользователь" : "Сервер", res.warns);
});
