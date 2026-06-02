import Router from "express";

const indexRouter = Router();

const messages = [
    {
        text: "Hey there",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello world!",
        user: "Charles",
        added: new Date(),
    },
]

indexRouter.get("/", (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
});

export default indexRouter;