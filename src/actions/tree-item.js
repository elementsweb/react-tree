import {
  SELECT_ITEM
} from '../constants';

export const selectItem = (namespace = 'default', uuid, value) => ({
  type: `@@react-tree/${namespace}/${SELECT_ITEM}`,
  uuid,
  value
});
