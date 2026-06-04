import Router from "express";
import { createId, getMessageById, checkProfanity } from "../controllers/indexController.js";

const indexRouter = Router();

const messages = [
    {
        id: createId(),
        text: "Hey there",
        user: "Amando",
        added: new Date(),
    },
    {
        id: createId(),
        text: "Hello world!",
        user: "Charles",
        added: new Date(),
    },
]

indexRouter.get("/", (req, res) => {
    res.render("index", {messages: messages});
});

indexRouter.post("/new", (req, res) => {
    const { messageText, nameText } = req.body;

    const filteredMessage = checkProfanity(messageText);
    const filteredName = checkProfanity(nameText);

    messages.push({ id: createId(), text: filteredMessage, user: filteredName, added: new Date() });
    res.redirect("/");
});

indexRouter.get("/details/:messageId", getMessageById(messages));

export default indexRouter;