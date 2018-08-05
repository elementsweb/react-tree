import reducer from '../tree-item';
import { SELECT_ITEM } from '../../constants';

describe('tree item reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      selected: [],
    };
  });

  it('should return the initial state', () => {
    expect(reducer()(undefined, {})).toEqual(initialState);
  });

  it('should handle @@react-tree/default/SELECT_ITEM with "value" === true', () => {
    expect(reducer()(initialState, {
      type: `@@react-tree/default/${SELECT_ITEM}`,
      uuid: 1,
      value: true
    })).toEqual({
      selected: [1]
    });
  });

  it('should handle @@react-tree/default/SELECT_ITEM for duplicate selected item', () => {
    initialState.selected = [1];
    expect(reducer()(initialState, {
      type: `@@react-tree/default/${SELECT_ITEM}`,
      uuid: 1,
      value: true
    })).toEqual({
      selected: [1]
    });
  });

  it('should handle @@react-tree/default/SELECT_ITEM with "value" === false', () => {
    initialState.selected = [1];
    expect(reducer()(initialState, {
      type: `@@react-tree/default/${SELECT_ITEM}`,
      uuid: 1,
      value: false
    })).toEqual({
      selected: [],
    });
  });
});
