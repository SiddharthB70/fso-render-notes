const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("Connecting to", url);
mongoose
    .connect(url)
    .then((result) => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.log("Unable to connect to Database");
    });

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Note", noteSchema);
