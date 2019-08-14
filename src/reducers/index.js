import * as actionTypes from '../actions/actionTypes';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  token,
  user: null,
  error: null,
  userId: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
    case actionTypes.UPDATE_USER_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        // eslint-disable-next-line no-underscore-dangle
        userId: action.payload.user._id,
        isAuthenticated: true,
        error: null,
      };
    case actionTypes.FETCH_USER_DATA:
      return {
        ...state,
        user: action.payload,
        // eslint-disable-next-line no-underscore-dangle
        userId: action.payload._id,
      };
    case actionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATE_USER_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
        user: '',
        userId: '',
      };
    default:
      return state;
  }
}