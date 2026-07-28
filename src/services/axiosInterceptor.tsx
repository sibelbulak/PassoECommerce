import { useEffect } from 'react';
import api from './api';
import { useLoading } from '../context/loadingContext';

const AxiosInterceptor = () => {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      config => {
        showLoading();
        return config;
      },
      error => {
        hideLoading();
        return Promise.reject(error);
      },
    );

    const responseInterceptor = api.interceptors.response.use(
      response => {
        hideLoading();
        return response;
      },
      error => {
        hideLoading();
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [hideLoading, showLoading]);

  return null;
};

export default AxiosInterceptor;
