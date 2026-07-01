/*eslint-disable*/

import axios from 'axios';
import { showALert } from './alert';

// type is ("password" ,"data")
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? // ? 'http://127.0.0.1:8000/api/v1/users/updateMyPassword'
          // : 'http://127.0.0.1:8000/api/v1/users/updateMe';
          '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    console.log(type);
    console.log(data);

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success')
      showALert('success', `${type.toUpperCase()} updated successfully!`);
  } catch (error) {
    showALert('error', error.response.data.message);
  }
};
