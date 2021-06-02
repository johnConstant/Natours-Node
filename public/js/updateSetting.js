import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:8000/api/v1/users/update-my-password'
        : 'http://127.0.0.1:8000/api/v1/users/update-my-account';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
      //   setTimeout(() => {
      //     location.assign('/my-account');
      //   }, 500);
    }
    //console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
