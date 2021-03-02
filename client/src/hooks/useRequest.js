import {useState, useEffect} from 'react';
import axios from 'axios';

const initialState = {
  status: 'idle',
  code: null,
  message: 'Loading...',
  data: '',
};

function useRequest(url, isFetching) {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    if (!isFetching) {
      return;
    }
    const fetchData = async () => {
      setData({...initialState, status: 'loading'});
      try {
        const data = await axios.get(`${url}`);
        setData({
          status: 'success',
          code: data.status,
          message: 'View the JSON below',
          data: JSON.stringify(data.data, null, 4),
        });
      } catch (error) {
        console.log('ERROR', error.response);
        setData({
          status: 'error',
          code: error.response?.status,
          message: error.response?.data.message,
          data: JSON.stringify(error.response?.data, null, 4),
        });
      }
    };

    fetchData();
  }, [isFetching, url]);

  return data;
}

export default useRequest;
