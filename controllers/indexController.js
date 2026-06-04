import { format } from "date-fns";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});
const censor = new TextCensor();

export function formatDate() {
    const timestamp = format(new Date(), "h:mmaaa M/dd/yy ");

    return timestamp;
}

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

export function checkProfanity(text) {
    const matches = matcher.getAllMatches(text);
    const filteredText = censor.applyTo(text, matches);
    return filteredText;
}