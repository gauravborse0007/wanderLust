const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "670ac2acf2280d0a6d7c801c" })); 
  //map will doesnot make changes in already created array it creates new array and add this all 
  //listing data along with new property i.e "owner" here
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();