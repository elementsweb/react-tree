import {
  SELECT_ITEM
} from '../constants';

const initialState = {
  selected: ''
}

const update = (namespace = 'default') => (state = initialState, action) => {
  switch (action.type) {
    case `@@react-tree/${namespace}/${SELECT_ITEM}`:
      if (action.value === true) {
        return {
          ...state,
          selected: action.uuid,
        }
      } else {
        return {
          ...state,
          selected: initialState.selected
        }
      }

    default:
      return state;
  }
};

export default update;
