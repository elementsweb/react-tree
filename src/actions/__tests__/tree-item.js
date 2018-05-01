import { selectItem } from '../tree-item';
import { SELECT_ITEM } from '../../constants';

describe('tree item actions', () => {
  let uuid;
  let value;

  beforeEach(() => {
    uuid = 1;
    value = true;
  });

  it('creates action to select item with default "namespace"', () => {
    expect(selectItem(undefined, uuid, value)).toEqual({
      type: `@@react-tree/default/${SELECT_ITEM}`,
      uuid,
      value
    });
  });

  it('creates action to select item', () => {
    expect(selectItem('one', uuid, value)).toEqual({
      type: `@@react-tree/one/${SELECT_ITEM}`,
      uuid,
      value
    });
  });
});
