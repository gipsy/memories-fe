import { AUTH } from '../constants/actionTypes';
import * as api from '../index';

export const signin = (formData, history) => async (dispatch) => {
  try {
    // await api.signin();
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    // await api.signup();
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}
