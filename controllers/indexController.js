import { format } from "date-fns";

export function formatDate() {
    const timestamp = format(new Date(), "h:mmbbb M/dd/yy ");

    return timestamp;
}

let currentId = 0;

export function createId() {
    return ++currentId;
}