import { format } from 'date-fns';

export default function formatDate(date) {
    const newDate = new Date(date);
    const res = format(newDate, 'dd MMM y HH:mm');
    return res;
}