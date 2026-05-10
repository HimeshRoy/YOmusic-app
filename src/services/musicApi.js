import axios from "axios";

const BASE_URL = "https://saavn.sumit.co/api";

export const searchMusic = async (query) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/search/songs?query=${query}`
    );

    return response.data.data.results;

  } catch (error) {

    console.log(error);

  }

};