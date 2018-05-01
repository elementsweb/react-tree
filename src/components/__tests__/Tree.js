import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import {
  Tree,
  mapStateToProps,
  mapDispatchToProps
} from '../Tree';

describe('Tree', () => {
  let state;
  let ownProps;
  let dispatch;
  let wrapper;
  let props;

  beforeEach(() => {
    state = {
      allIds: [1, 2, 3]
    };
    ownProps = {
      selectAllIds: (state) => state.allIds
    };
    dispatch = jest.fn();
    props = {
      allIds: [{
        uuid: 1,
        name: 'Item 1'
      }, {
        uuid: 2,
        name: 'Item 2',
        parent: 1
      }],
      selectAllIds: jest.fn(),
      selectState: jest.fn(),
      selectItem: jest.fn(),
    };
    wrapper = shallow(
      <Tree {...props} />
    );
  });

  it('should map state to props correctly', () => {
    expect(mapStateToProps(state, ownProps)).toEqual({
      allIds: state.allIds
    });
  });

  it('should map dispatch to props correctly', () => {
    expect(mapDispatchToProps(dispatch, ownProps)).toEqual({
      selectItem: expect.any(Function)
    });
  });

  it('should filter props from "allIds" to "items" in state if they have parent key', () => {
    expect(wrapper.state('items')).toEqual([props.allIds[0]]);
  });

  it('should contain container element', () => {
    expect(wrapper.name()).toEqual('div');
    expect(wrapper.hasClass('tree')).toEqual(true);
  });

  it('creates one TreeItem for item with no parent in state', () => {
    expect(wrapper.children().length).toEqual(1);
  });

  it('TreeItem has correct props', () => {
    const treeItem = wrapper.childAt(0);
    expect(treeItem.name()).toEqual('Connect(TreeItem)');
    expect(treeItem.props()).toEqual({
      uuid: 1,
      label: 'Item 1',
      selected: undefined,
      getAllIds: props.selectAllIds,
      selectState: props.selectState,
      onToggle: props.selectItem
    }); 
  });
});
