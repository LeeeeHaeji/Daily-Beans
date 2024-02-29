import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://openmarket.weniv.co.kr/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

