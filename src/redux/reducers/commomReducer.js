import { COLOR_PICKER_SET, COMMON_LOADING} from "../actiontypes";
const initialState = {
  colorrdata:"",
  commonLoading:false
};
export default function commomReducer(state = initialState, action) {
  switch (action.type) {
    case COLOR_PICKER_SET:
      return {
        ...state,
        colorrdata: action.colorrdata,
      };
      case COMMON_LOADING:
        return {
          ...state,
          commonLoading: action.payload,
        };
    default: {
      return state;
    }
  }
}