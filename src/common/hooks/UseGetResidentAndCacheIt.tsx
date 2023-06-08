import { useState, useEffect, useContext } from 'react';
import APIUtils from '../api-utils/APIUtils';
import { ErrorContext } from '../../App';

export default function useGetResidentAndCacheIt(apiURL: string, cache) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    async function fetchData() {
      let result = {};
      try {
        if (!cache.current[apiURL]) {
          cache.current[apiURL] = true;
          setLoading(true);
          result = await APIUtils().getData(apiURL);
          cache.current[apiURL] = result;
          setLoading(false);
        } else {
          result = cache.current[apiURL];
        }
      } catch (error) {
        setError(error);
      } finally {
        setData(result);
      }
    }
    fetchData();
  }, [apiURL]);
  return { data, loading };
}
