
export const getGraphTime = (days) => {

    let intervel = (60 * 60 * 24 * days)

    let date = new Date()
    let currentDate = date.getTime() / 1000
    //
    let endDate = currentDate * 1000
    //
    let startDate = (currentDate - intervel) * 1000

    return {
        start: startDate,
        end: endDate
    }

}