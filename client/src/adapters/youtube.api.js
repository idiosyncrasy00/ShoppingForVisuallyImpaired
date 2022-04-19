import axios from 'axios';

const KEY = "AIzaSyCW2xFajZZPOV-5eMVYyXIuPZrN38pHaqA";

const API_URL = "https://www.googleapis.com/youtube/v3/"

export const youtubeAPI = (keyword) => {
  return axios.get(API_URL + "search", {
    params: {
      part: 'snippet',
      maxResults: 5,
      key: KEY,
      q: keyword
    }
  })
}