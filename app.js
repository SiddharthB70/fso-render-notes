const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const userRouter = require("./controllers/users");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB (Primary URI)");
    })
    .catch((error) => {
        logger.error(
            "Unable to Connect to Primary MongoDB URI. Trying Secondary MongoDB URI",
            error.message
        );
        mongoose
            .connect(config.SECONDARY_MONGODB_URI)
            .then(() => {
                logger.info("Connected to MongoDB (Secondary URI)");
            })
            .catch((error) => {
                logger.error(
                    "Unable to Connect to Secondary MongoDB URI",
                    error.message
                );
                logger.info(config.SECONDARY_MONGODB_URI);
            });
    });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
