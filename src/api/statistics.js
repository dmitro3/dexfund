import configs from './../config';
import axios from 'axios';

export const getChartData = async (fund, from, to=0, interval) => {
    try {
        const endpoint = `${configs.API_ENDPOINT}/fund/${fund}/chartData?from=${from}&to=${to}&interval=${interval}`;
        console.log("ENDPOINT "+endpoint)
        const { data } = await axios.get(endpoint);
        const finalData = data.map((item) => {
            var date = new Date(item.timestamp * 1000);
            var stringDate = `${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear().toString().slice(-2)} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
            return {
                timestamp: stringDate,
                sharePrice: item.sharePrice.toFixed(2)
            }
        });
        return finalData;
    } catch(e) {
        console.log(e)
        return [];
    }
}