export default function numberFormat(n: number): string {
    let result = '';
    if (n < 10000) {
        return String(n);
    } else if (n < 10000 * 10000) {
        return parseInt(String(n / (10000))) + '万';
    } else {
        return parseInt(String(n / (10000 * 10000))) + '亿';
    }
}