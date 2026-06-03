import Router from "express";
import { formatDate, createId } from "../controllers/indexController.js";

const indexRouter = Router();

const messages = [
    {
        id: createId(),
        text: "Hey there",
        user: "Amando",
        added: formatDate(),
    },
    {
        id: createId(),
        text: "Hello world!",
        user: "Charles",
        added: formatDate(),
    },
]

indexRouter.get("/", (req, res) => {
    res.render("index", {messages: messages});
});

indexRouter.post("/new", (req, res) => {
    const { messageText, nameText } = req.body;
    messages.push({ id: createId(), text: messageText, user: nameText, added: formatDate() });
    res.redirect("/");
});

export default indexRouter;