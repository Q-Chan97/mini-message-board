import express from "express";
import indexRouter from "./routers/indexRouter.js";

import path from "node:path";

const app = express();

const PORT = process.env.PORT || 8080;

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

// Unmatched routes
app.use((req, res) => {
    res.status(404).render("error");
})

//Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).render("error");
})

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server listening on port ${PORT}`);
});