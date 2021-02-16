const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");
const path = require("path");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:a53c6f61-2e05-403e-8bdc-699a9c55de4b",
  key:
    "ad5c0955-7832-4bd8-9130-2faa6aa95eb4:nTt1/t1xUKtP24njCJRp38ZwasuHoroV4WGZ0iAzX1I="
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static(path.resolve(__dirname, "public")));

app.post("/users", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/updateuser", (req, res) => {
  const { userId, AvatarUrl } = req.body;
  chatkit
    .updateUser({
      id: userId,
      avatarURL: AvatarUrl
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      res.status(error.status).json(error);
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
