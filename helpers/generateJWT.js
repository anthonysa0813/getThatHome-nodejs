const JWT = require("jsonwebtoken");

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid: id };
    console.log("payload", payload);

    JWT.sign(
      payload,
      process.env.MYSECRETKEYORPUBLIC,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
