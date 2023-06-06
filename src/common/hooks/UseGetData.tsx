import { useState, useEffect, useRef } from 'react';
import APIUtils from '../api-utils/APIUtils';

export default function useGetData(apiURL: string) {
  const [data, setData] = useState({});
  const isFirstCall = useRef(true);

  useEffect(() => {
    async function fetchData() {
      let result = {};
      try {
        if (isFirstCall.current) {
          isFirstCall.current = false;
          result = await APIUtils().getData(apiURL);
        }
      } finally {
        setData(result);
      }
    }
    fetchData();
  }, [apiURL]);
  return data;
}
