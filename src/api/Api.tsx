import axios from 'axios';
import { useSelector } from 'react-redux';


const axiosInstance = axios.create({
  baseURL: 'http://65.18.112.78:9090',
  headers: {
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

export const getRequest = async URL => await axiosInstance.get(URL);

export const postRequest = async (URI, payload) => await axiosInstance.post(URI, payload);

export const singleRequest = async (URI) => await axiosInstance.post(URI);

//    export const putRequest = async (URI, payload) => await axiosInstance.put(URI, payload);

//    export const patchRequest = async (URI, payload) =>
//      await axiosInstance.patch(URI, payload);

export const deleteRequest = async URI => await axiosInstance.delete(URI);
