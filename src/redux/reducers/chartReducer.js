import { initialState } from "../state.js";
import { actionTypes } from "../actions/actionTypes";

export default function chartReducer(state = initialState, action) {
  console.log(action, "hjhj");
  debugger;
  switch (action.type) {
    case actionTypes.GET_CHART:
      return { initialState };

    case actionTypes.UPDATE:
      console.log(action.payload, "in reducer");
      let states = action.payload;
      return states;

    default:
      return state;
  }
}
