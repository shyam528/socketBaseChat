import axios from "axios";

const CONFIG = require('../../config.json');

export function userLogin(data) {
  return function(dispatch) {
    axios.post(CONFIG.backendApiUrl+'users/login', data,
      {headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    })
    .catch(function (error) {
       dispatch({type: "LOGIN_FAILED", payload: error})
    })
  }
}

export function userLogout(access_token) {
  return function(dispatch) {
    axios.post(CONFIG.backendApiUrl+'users/logout?access_token='+access_token)
    .then(function (response) {
      dispatch({type: "LOGOUT_SUCCESS", payload: response.data})
    })
    .catch(function (error) {
       dispatch({type: "LOGOUT_FAILED", payload: error})
    })
  }
}

export function userSignUp(data) {
  return function(dispatch) {
    axios.post(CONFIG.backendApiUrl+'users',
      {headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      dispatch({type: "SIGNUP_SUCCESS", payload: response.data})
    })
    .catch(function (error) {
       dispatch({type: "SIGNUP_FAILED", payload: error})
    })
  }
}