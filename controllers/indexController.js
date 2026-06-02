import { format } from "date-fns";

export function formatDate() {
    const timestamp = format(new Date(), "h:mmbbb M/dd/yy ");

    return timestamp;
}