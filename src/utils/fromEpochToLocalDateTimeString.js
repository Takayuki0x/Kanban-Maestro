
/**
 * Converts epoch seconds to a local date and time string.
 *
 * @param {number} epochSeconds - The epoch seconds to convert.
 * @returns {string} The local date and time string in the format "MM/DD/YYYY - HH:MM:SS AM/PM".
*/

export default function fromEpochToLocalDateTimeString(epochSeconds){
    var dateTimeFromEpoch = new Date(epochSeconds);
    var dateFromEpoch = dateTimeFromEpoch.toLocaleDateString();
    var timeFromEpoch = dateTimeFromEpoch.toLocaleTimeString();

    return(`${dateFromEpoch} - ${timeFromEpoch}`)
}
