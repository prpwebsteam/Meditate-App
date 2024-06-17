import { AUTH_RESET_INITIAL_STATE, OTP_SEND_TYPE, USERREGISTER_TYPE, USERLOGIN_TYPE } from "../actiontypes";
const initialState = {
  sendotpdata: [],
  userregisterdata: [],
  logindata: [],
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_RESET_INITIAL_STATE:
      return {
        ...initialState,
      };
    case OTP_SEND_TYPE:
      return {
        ...state,
        sendotpdata: action.sendotpdata,
      };
    case USERREGISTER_TYPE:
      return {
        ...state,
        userregisterdata: action.userregisterdata,
      };
    case USERLOGIN_TYPE:
      return {
        ...state,
        logindata: action.logindata,
      };
    default: {
      return state;
    }
  }
}