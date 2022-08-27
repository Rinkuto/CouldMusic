import list from 'china-location/dist/location.json';
import ChinaLocation from 'china-location';

const location = new ChinaLocation(list);

const defaultLocation = location.getCurrentAddress();

export function getCity(cityId: number) {
    if (cityId >= 100000 && cityId < 1000000) {
        const province = Math.floor(cityId / 10000) + '0000';
        const city = Math.floor(cityId / 100) + '00';
        if (province === city) {
            // @ts-ignore
            return list[province].cities[city].name + ' ' + list[province].cities[city].districts[cityId].name
        } else {
            // @ts-ignore
            return list[province].name + ' ' + list[province].cities[city].name;
        }
    } else if (cityId >= 1000000) {
        return '海外';
    } else {
        return '其他';
    }
}