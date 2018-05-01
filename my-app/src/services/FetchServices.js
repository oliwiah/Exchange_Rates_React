export function getStartEndDataFetch(chosenCurrency, startDataSec, endDataSec) {
    return (
        fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${chosenCurrency}/${startDataSec}/${endDataSec}/?format=json`)
            .then(data => data.json())
    )
}

export function getDailyData() {
    return (
        fetch(`http://api.nbp.pl/api/exchangerates/tables/c/today/?format=json`)
            .then(data => data.json())
    )
}