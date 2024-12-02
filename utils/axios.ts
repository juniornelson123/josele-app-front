import axios, { AxiosInstance } from 'axios';

export default function getInstance(): AxiosInstance {
  return axios.create({
    baseURL: 'https://automatic-cactus-5f5494174a.strapiapp.com',
  });
}
