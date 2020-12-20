import { 
    format,
    formatISO,
    parseISO,
    isEqual, 
    isThisWeek,
    getMonth
} from "date-fns";

const  clearNode = (parentNode) => {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
}

const getTodayDate = ()=> formatISO(new Date(), { representation: 'date' });

const areDateEquals = (date1, date2) => isEqual(parseISO(date1),parseISO(date2));

const isDateFallInCurrentWeek = (date) => isThisWeek(parseISO(date));

const getDateMonthName = (date) => getMonth(parseISO(date));

export {
    clearNode,
    getTodayDate,
    areDateEquals,
    getDateMonthName,
    isDateFallInCurrentWeek
}