import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export class API {
  constructor() {
    this.apiKey = publicRuntimeConfig.API_KEY;
    this.baseURL = "api.giphy.com/v1/gifs/search";
  }

  fetchGifs(keyword, limit, offset) {
    var myRequest = new Request(
      `http://${this.baseURL}?api_key=${
        this.apiKey
      }&q=${keyword}&limit=${limit}&offset=${offset}`
    );
    return fetch(myRequest, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  }
}
