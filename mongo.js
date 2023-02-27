const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopendyz:${password}@cluster0.qs94riw.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model("Note1", noteSchema);

const note = new Note({
    content: "Hello there",
    important: true,
});

note.save().then((result) => {
    console.log("note saved");
    mongoose.connection.close();
});
