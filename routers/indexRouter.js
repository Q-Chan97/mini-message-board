import Router from "express";
import { formatDate } from "../controllers/indexController.js";

const indexRouter = Router();

const messages = [
    {
        text: "Hey there",
        user: "Amando",
        added: formatDate(),
    },
    {
        text: "Hello world!",
        user: "Charles",
        added: formatDate(),
    },
]

indexRouter.get("/", (req, res) => {
    res.render("index", {messages: messages});
});

export default indexRouter;