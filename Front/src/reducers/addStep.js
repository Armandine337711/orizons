import {
  CHANGE_ADDSTEP_FIELD, POST_NEW_STEP_SUCCESS,
} from '../actions/types';

const initialState = {
  title: '',
  localisation: [],
  date: '',
  summary: '',
  pictures: [],
  showInput: false,
  localisationInput: '',
  country: '',
  country_code: ''
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADDSTEP_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    default:
      return oldState;
  }
};

export default reducer;
