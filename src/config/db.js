const mongoose = require("mongoose");

//connection to mongodb atlas
const connectDB = () => {
  try {
    
    const conn = mongoose.connect(
      // ` mongodb://localhost:27017/pictHostel`,
      `mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASSWORD}@cluster0.rfaz9.mongodb.net/PICT`,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Success");
  } catch (error) {
    console.log("Failed ", error);
  }
};

module.exports = connectDB;
