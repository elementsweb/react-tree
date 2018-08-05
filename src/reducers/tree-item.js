import {
  SELECT_ITEM
} from '../constants';

const initialState = {
  selected: [],
}

const update = (namespace = 'default') => (state = initialState, action) => {
  switch (action.type) {
    case `@@react-tree/${namespace}/${SELECT_ITEM}`:
      if (action.value === true) {
        return {
          ...state,
          selected: state.selected.indexOf(action.uuid) !== -1 ? state.selected : [...state.selected, action.uuid],
        }
      } else {
        return {
          ...state,
          selected: state.selected.filter(s => s !== action.uuid),
        }
      }

    default:
      return state;
  }
};

export default update;
