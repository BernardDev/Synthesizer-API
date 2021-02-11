import {useState, useEffect} from 'react';
import axios from 'axios';

const initialState = {
  status: 'loading',
  code: null,
  message: 'Loading',
  data: '',
};

function useRequest(url, isFetching) {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    if (!isFetching) {
      return;
      // prevent fetching on load, wait until user puts in meaningful url
    }
    const fetchData = async () => {
      setData(initialState);
      try {
        // if (url !== 'http://localhost:4000/api') {
        const data = await axios.get(`${url}`);
        setData({
          status: 'success',
          code: data.status,
          message: 'view the JSON below.',
          data: JSON.stringify(data.data, null, 4),
        });
        // } else {

        // }
      } catch (error) {
        console.log('ERROR', error.response);
        // let message = '';

        // switch (error.response?.status) {
        //   case 404:
        //     message = 'Not found, does this record exist?';
        //     break;

        //   default:
        //     message = 'Something went wrong, try to refresh';
        //     break;
        // }
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
