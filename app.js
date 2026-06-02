import express from "express";
import indexRouter from "./routers/indexRouter.js";

import path from "node:path";

const app = express();

const PORT = process.env.PORT || 8080;

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server listening on port ${PORT}`);
});