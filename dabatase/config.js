const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    // mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CNN);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error en la conexion");
  }
};

module.exports = connectMongo;
