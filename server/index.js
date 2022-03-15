const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const conversationRoutes = require("./routes/conversation");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/conversation", conversationRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
