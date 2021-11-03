import configs from './../config';
import axios from 'axios';

export const getAllCreationSharePrices = async () => {
    try {
        const { data } = await axios.get(`${configs.API_ENDPOINT}/funds/creationSharePrices`);

        console.log("CREATION SHARE PRICES: "+data)

        return data;
    } catch(e) {
        console.log(e)
        return {};
    }
}