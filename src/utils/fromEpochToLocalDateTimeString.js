export default function fromEpochToLocalDateTimeString(epochSeconds){
    var dateTimeFromEpoch = new Date(epochSeconds);
    var dateFromEpoch = dateTimeFromEpoch.toLocaleDateString();
    var timeFromEpoch = dateTimeFromEpoch.toLocaleTimeString();

    return(`${dateFromEpoch} - ${timeFromEpoch}`)
}
