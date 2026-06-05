import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";
import { body, validationResult, matchedData } from "express-validator";


const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});
const censor = new TextCensor();

const validateMessage = [
    body("nameText").trim()
        .isLength({min: 1, max: 18}).withMessage("Name must be between 1 and 18 characters"),
    body("messageText").trim()
        .isLength({min: 1, max: 280}).withMessage("Message must be between 1 and 280 characters"),
]

let currentId = 0;

export function createId() {
    return ++currentId;
}

export function getMessageById(messages) {
    return (req, res) => {
        const { messageId } = req.params;

        const message = messages.find((message) => {
            return message.id === Number(messageId);
        });

        res.render("details", { message })
    }
}

function checkProfanity(text) {
    const matches = matcher.getAllMatches(text);
    const filteredText = censor.applyTo(text, matches);
    return filteredText;
}

export function messageCreatePost(messages) {
    return [
    validateMessage,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("form", {
                errors: errors.array(),
            });
        }
        const { messageText, nameText } = matchedData(req);

        const filteredMessage = checkProfanity(messageText);
        const filteredName = checkProfanity(nameText);

        messages.push({ id: createId(), text: filteredMessage, user: filteredName, added: new Date() });
        res.redirect("/");
    },
    ]
}