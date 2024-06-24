import { COLOR_PICKER_SET, COMMON_LOADING } from "../actiontypes";

export const color_picker_set_action = (data) => dispatch => {
      dispatch({ type: COLOR_PICKER_SET, colorrdata: data });
}
export const commonLoading_Action = (loading = true) => dispatch => {
  dispatch({ type: COMMON_LOADING, payload: loading });
};
