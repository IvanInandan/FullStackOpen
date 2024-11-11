const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://iinandan97:${password}@notes.oq2i5.mongodb.net/test?retryWrites=true&w=majority&appName=notes`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });

    const Note = mongoose.model("Note", noteSchema);

    const note = new Note({
      content: "Make me important!",
      important: false,
    });

    // Save the note
    note.save().then((result) => {
      console.log("note saved!");
      mongoose.connection.close();
    });

    // Retrieve and log all notes
    Note.find({}).then((result) => {
      result.forEach((note) => {
        console.log(note);
      });
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log("Error connecting to:", url, error);
  });
