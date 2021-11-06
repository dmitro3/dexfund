import configs from "./../config";
import axios from "axios";

export const getAllCreationSharePrices = async () => {
  try {
    const { data } = await axios.get(
      `${configs.API_ENDPOINT}/funds/creationSharePrices`
    );

    return data;
  } catch (e) {
    return {};
  }
};
