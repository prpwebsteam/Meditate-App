import { APIURLS, apiPostMethod, apiGetMethod } from '../../api';
import { AUTH_RESET_INITIAL_STATE, USERREGISTER_TYPE, OTP_SEND_TYPE, USERLOGIN_TYPE } from "../actiontypes";
import { commonLoading_Action } from './CommonAction';

export const auth_reset_initial_state_reduser = () => dispatch => {
    dispatch({ type: AUTH_RESET_INITIAL_STATE });
}

export const sendotp_Action = (mo_no) => dispatch => {
    dispatch(commonLoading_Action(true));
    var params =
        '&mo_no=' + mo_no
    apiPostMethod({ endpoint: APIURLS.SEND_OTP_URL, params: params })
        .then((response) => {
            dispatch({ type: OTP_SEND_TYPE, sendotpdata: response });
        })
        .catch((error) => {
            dispatch({ type: OTP_SEND_TYPE, sendotpdata: error });
        })
        .finally(() => dispatch(commonLoading_Action(false)));
};

export const userRegister_Action = (data) => dispatch => {
    dispatch(commonLoading_Action(true));
    var params =
        '&request=register' +
        '&first_name=' + data.first_name +
        '&last_name=' + data.last_name +
        '&email=' + data.email +
        '&phone=' + data.phone +
        '&countryCode=+91' +
        '&date_of_birth=' + data.date_of_birth +
        '&password=' + data.password
    apiPostMethod({ endpoint: APIURLS.USER_REGISTER_URL, params: params })
        .then((response) => {
            dispatch({ type: USERREGISTER_TYPE, userregisterdata: response });
        })
        .catch((error) => {
            dispatch({ type: USERREGISTER_TYPE, userregisterdata: error });
        })
        .finally(() => dispatch(commonLoading_Action(false)));
};

export const userLogin_Action = (mo_no) => dispatch => {
    dispatch(commonLoading_Action(true));
    var params =
        '&mo_no=' + mo_no
    apiPostMethod({ endpoint: APIURLS.USER_LOGIN_URL, params: params })
        .then((response) => {
            dispatch({ type: USERLOGIN_TYPE, logindata: response });
        })
        .catch((error) => {
            dispatch({ type: USERLOGIN_TYPE, logindata: error });
        })
        .finally(() => dispatch(commonLoading_Action(false)));
};

export const Logout_action = () => dispatch => {
    dispatch({ type: AUTH_RESET_INITIAL_STATE });
};
