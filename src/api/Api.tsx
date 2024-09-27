import axios from 'axios';
import { useSelector } from 'react-redux';


const axiosInstance = axios.create({
  baseURL: 'http://65.18.112.78:9090',
  headers: {

    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NSIsImlhdCI6MTcyNzE1NjA2OCwiZXhwIjoxNzI3MjQyNDY4fQ.aBu0rheAWpTkNPjtBRGfgeVjtmb02MI2u0pqzRnNClJF-q_z2DBBebEXBCtb_GMpmTO_Yt7dSVxxJaTEPn4EFw`,

    'Content-Type': 'application/json',
  },
});

const axiosInstanceWithToken = axios.create({
  baseURL: 'http://65.18.112.78:9090',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  axiosInstanceWithToken.defaults.headers.Authorization = `Bearer ${token}`;
};
export const getRequestWithToken = async (URL: string) =>
  axiosInstanceWithToken.get(URL);
export const postRequestWithToken = async (URL: string, data: any) =>
  axiosInstanceWithToken.post(URL, data);

export const getRequest = async (URL: string) => await axiosInstance.get(URL);

export const postRequest = async (URI: string, payload: any) => await axiosInstance.post(URI, payload);

export const singleRequest = async (URI: string) => await axiosInstance.post(URI);

//    export const putRequest = async (URI, payload) => await axiosInstance.put(URI, payload);

   export const patchRequest = async (URI) =>
     await axiosInstance.patch(URI);

export const deleteRequest = async (URI: string) => await axiosInstance.delete(URI);
