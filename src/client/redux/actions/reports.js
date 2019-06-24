export const moduleName = 'reports';
export const SET_REPORT = `${moduleName}/SET_REPORT`;
export const SAVE_STATE_DATA = `${moduleName}/SAVE_STATE_DATA`;
export const SET_STATE_DATA = `${moduleName}/SET_STATE_DATA`;
export const SET_STORY = `${moduleName}/SET_STORY`;


export const setReport = (data) => ({
  type: SET_REPORT,
  payload: data
});

export const setStory = (data) => ({
  type: SET_STORY,
  payload: data
});

export const saveStateData = (data) => ({
  type: SAVE_STATE_DATA,
  payload: data
});

export const setStateData = (data) => ({
  type: SET_STATE_DATA,
  payload: data
});