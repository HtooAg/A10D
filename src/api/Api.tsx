import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGQ3ZDVlNzFmM2MxNjAyODAwNGJkYzJlZDllZThjZiIsIm5iZiI6MTcyMjkyMTU4MS42NjE1Niwic3ViIjoiNjZiMWFjNjZjZWVmZWZkZjAxMGNmNDExIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O8lO7ht0jcqyeKfaOPMnc3C3IL1jZXaknyIJOzfVc_M`,
    'Content-Type': 'application/json',
  },
});

export const getRequest = async URL => await axiosInstance.get(URL);

export const postRequest = async (URI, payload) =>
    await axiosInstance.post(URI, payload);

//    export const putRequest = async (URI, payload) => await axiosInstance.put(URI, payload);

//    export const patchRequest = async (URI, payload) =>
//      await axiosInstance.patch(URI, payload);

   export const deleteRequest = async (URI) => await axiosInstance.delete(URI);
