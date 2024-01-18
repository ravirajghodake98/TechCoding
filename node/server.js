const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`Database is connected!!!`));

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
