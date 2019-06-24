/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-fallthrough */
/* eslint-disable indent */
import { SET_REPORT, SAVE_STATE_DATA, SET_STORY, SET_STATE_DATA } from '../actions/reports';

const initialState = {
  items: [ ],
  stateData: null,
  story: []
};

export default function reportsReducer(state = initialState, action) {
  const { type, payload } = action;

  let newState;

  switch (type) {

    case SET_REPORT:
      newState = { ...state };
      newState.items = [ ...state.items, ...payload ];
      return newState;

    case SET_STORY:
        newState = { ...state };
        newState.story = payload;
        return newState;

    case SET_STATE_DATA:
      newState = { ...state };
      let stateData = state.story[payload];
      newState.items = stateData.report;
      newState.stateData = stateData;

      return newState;

    case SAVE_STATE_DATA:
        newState = { ...state };
        newState.story.push(payload);
        localStorage.setItem('ws-story', JSON.stringify(newState.story));
        return newState;

    default:
      return state;
  }
}