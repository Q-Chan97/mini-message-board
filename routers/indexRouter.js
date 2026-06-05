import Router from "express";
import { createId, getMessageById, messageCreatePost } from "../controllers/indexController.js";

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

indexRouter.post("/new", messageCreatePost(messages));

indexRouter.get("/details/:messageId", getMessageById(messages));

export default indexRouter;