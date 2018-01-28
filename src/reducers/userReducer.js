const InitialState = {
  user: {},
  loggedIn: false,
  error: null,
  signUp:{}
}
export default function reducer(state=InitialState, action) {
  console.log("action",action);
  switch (action.type) {
    case "USER_LOGIN": {
      return {...state, loggedIn: false}
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      }
    }

    case "LOGIN_FAILED": {
      return {...state, loggedIn: false, error: action.payload}
    }

    case "LOGOUT_SUCCESS": {
      return {...state, loggedIn: false, user: {}}
    }

    case "SIGNUP_SUCCESS": {
      return {...state, signUp: action.payload}
    }

    case "SIGNUP_FAILED": {
      return {...state, error: action.payload}
    }
  }

  return state
}
