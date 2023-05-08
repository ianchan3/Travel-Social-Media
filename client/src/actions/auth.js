import * as authService from '../services/authService';
import * as actionTypes from '../constants/actionTypes';

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await authService.logIn(formData);
    dispatch({ type: actionTypes.AUTH, data });
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await authService.signUp(formData);
    dispatch({ type: actionTypes.AUTH, data });
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}