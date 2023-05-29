const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const app = require("./app");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = index;
