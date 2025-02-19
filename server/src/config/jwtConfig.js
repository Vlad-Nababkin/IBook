// NOTE - конфигурация для jwt-токенов
module.exports = {
  access: { expiresIn: "3m" },
  refresh: { expiresIn: "1d" }
};
