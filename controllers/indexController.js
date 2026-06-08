import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";
import { body, validationResult, matchedData } from "express-validator";
import { getAllMessages, addMessage, findMessage } from "../db/queries.js";


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

function checkProfanity(text) {
    const matches = matcher.getAllMatches(text);
    const filteredText = censor.applyTo(text, matches);
    return filteredText;
}

// PostgreSQL functions

export async function displayUserMessages(req, res) {
    const messages = await getAllMessages();
    res.render("index", { messages: messages });
}

export function messageCreatePost() {
    return [
        validateMessage,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("form", {
                    errors: errors.array(),
                });
            }

            const { messageText, nameText } = matchedData(req);
            const filteredMessage = checkProfanity(messageText);
            const filteredName = checkProfanity(nameText);

            await addMessage(filteredName, filteredMessage);
            res.redirect("/");
        }
    ]
}

export async function getMessageById(req, res) { 
    const { messageId } = req.params;

    const message = await findMessage(messageId);

    res.render("details", { message: message });
}


// Hard-Coded Database functions

// let currentId = 0;

// export function createId() {
//     return ++currentId;
// }

// export function messageCreatePost(messages) {
//     return [
//     validateMessage,
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).render("form", {
//                 errors: errors.array(),
//             });
//         }
//         const { messageText, nameText } = matchedData(req);

//         const filteredMessage = checkProfanity(messageText);
//         const filteredName = checkProfanity(nameText);

//         messages.push({ id: createId(), text: filteredMessage, user: filteredName, added: new Date() });
//         res.redirect("/");
//     },
//     ]
// }

// export function getMessageById(messages) {
//     return (req, res) => {
//         const { messageId } = req.params;

//         const message = messages.find((message) => {
//             return message.id === Number(messageId);
//         });

//         res.render("details", { message })
//     }
// }