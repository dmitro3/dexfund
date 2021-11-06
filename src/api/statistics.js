import configs from "./../config";
import axios from "axios";

export const getChartData = async (fund, from, to = 0, interval) => {
  try {
    const endpoint = `${configs.API_ENDPOINT}/fund/${fund}/chartData?from=${from}&to=${to}&interval=${interval}`;

    const { data } = await axios.get(endpoint);
    const finalData = data.map((item) => {
      var date = new Date(item.timestamp * 1000);
      var stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date
        .getUTCFullYear()
        .toString()
        .slice(-2)} ${
        date.getHours().toString().length < 2
          ? "0" + date.getHours().toString()
          : date.getHours().toString()
      }:${
        date.getMinutes().toString().length < 2
          ? "0" + date.getMinutes().toString()
          : date.getMinutes().toString()
      }`;
      return {
        timestamp: stringDate,
        sharePrice: item.sharePrice.toFixed(2),
      };
    });
    return finalData;
  } catch (e) {
    return [];
  }
};

export const getCreationSharePrices = async (funds) => {
  try {
    const endpoint = `${configs.API_ENDPOINT}/funds/creationSharePrices`;

    const { data } = await axios.post(endpoint, { funds: funds });

    return data;
  } catch (e) {
    return {};
  }
};
