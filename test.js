require("dotenv").config();
const lardiService = require("./service/lardi-service");

(async () => {
  await lardiService.add();
})();
