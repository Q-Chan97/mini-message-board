import Router from "express";
import { displayUserMessages, getMessageById, messageCreatePost } from "../controllers/indexController.js";

const indexRouter = Router();

// PostgreSQL Routes

indexRouter.get("/", displayUserMessages);

indexRouter.get("/new", (req, res) => {
    res.render("form");
})
indexRouter.post("/new", ...messageCreatePost());

indexRouter.get("/details/:messageId", getMessageById);



// Hard-Coded Database Routes

// const messages = [
//     {
//         id: createId(),
//         text: "Hey there",
//         user: "Amando",
//         added: new Date(),
//     },
//     {
//         id: createId(),
//         text: "Hello world!",
//         user: "Charles",
//         added: new Date(),
//     },
// ]

// indexRouter.get("/", (req, res) => {
//     res.render("index", {messages: messages});
// });

// indexRouter.post("/new", messageCreatePost(messages));

// indexRouter.get("/details/:messageId", getMessageById(messages));

export default indexRouter;