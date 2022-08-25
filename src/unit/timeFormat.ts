export default function timeFormat(time: number): string {
    if (time > 1000) {
        time /= 1000;
    }
    const timeM = time / 60
    const timeS = time % 60
    let timeMinute = ''
    let timeSeconds = ''
    if (timeM < 10) {
        timeMinute = `0${timeM}`
    } else {
        timeMinute = `${timeM}`
    }
    if (timeS < 10) {
        timeSeconds = `0${timeS}`
    } else {
        timeSeconds = `${timeS}`
    }
    timeMinute = timeMinute.substr(0, 2)
    timeSeconds = timeSeconds.substr(0, 2)
    return `${timeMinute}:${timeSeconds}`
}

export function dateFormat(time: string): string {
    let date = new Date(time);
    let month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
}
