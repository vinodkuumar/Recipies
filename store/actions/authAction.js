export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'https://auth-recipes-789.herokuapp.com/';
export const registerUser = (authData) => {
  const {fullName, email, password} = authData;

  return async (dispatch) => {
    const result = await fetch('https://auth-recipes-789.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });
    const resultData = await result.json();
    console.log(resultData);
    if (resultData.success) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }
    return resultData;
  };
};

export const loginUser = (authData) => {
  const {email, password} = authData;

  return async (dispatch) => {
    const result = await fetch('https://auth-recipes-789.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resultData = await result.json();
    console.log('resultdata = ', resultData);
    if (resultData.success) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: resultData,
      });
    } else {
      dispatch({
        type: LOGIN_USER_FAIL,
      });
    }
    console.log('result data = ', resultData);
    return resultData;
  };
};
