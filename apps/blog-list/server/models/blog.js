const { PORT, MONGODB_URI } = require("../utils/config");
const mongoose = require("mongoose");

console.log("Connecting to: ", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then((response) => {
    console.log("Connection success!");
  })
  .catch((error) => {
    console.log("Failure: ", error);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

/*
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        ...
    }
})
*/

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
