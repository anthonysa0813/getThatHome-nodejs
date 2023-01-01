const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.middlewares();
    this.paths = {
      users: "/api/users",
    };
    this.routes();
  }

  middlewares() {
    // directorio público
    this.app.use(express.static("public"));

    // lectura y parseo del body
    this.app.use(express.json());

    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/users.router"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
