require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const getPageContent = require("./service/scraper/puppeteer");
const updateData = require("./service/update-service");

const apiRouter = require("./routes/apiRouter");
const homeRouter = require("./routes/homeRouter");
const Card = require("./models/card");
const serverSettings = require("./models/serverSettings");
const createServerSettings = require("./service/helper/utility/createServerSettings");

const app = express();

app.use(cookieParser());
app.use(express.static(__dirname + "/client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(async () => {
    console.log("Connected to mongoDB");
    app.listen(port, () => console.log(`server started on PORT:${port}`));
    await createServerSettings();
    mainCycle();
    setInterval(() => mainCycle(), 120000);
  });

async function mainCycle() {
  // return await Card.deleteMany({}) // Костиль для видалення всіх заявок

  try {
      let data = await getPageContent();
      if (!data) {
        console.log("can't load della data");
      }
      for (let i = 0; i < data.length; i++) {
        let test = new Card(data[i]);
        test.needToUpdate = true;
        test.agreedPub = true;
        test.save((err, info) => {
          //if (err) { console.log('err') }
        });
    }
    updateData();
  } catch (error) {
    console.log(error);
  }
}
