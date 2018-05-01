import React from 'react';
import { shallow } from 'enzyme';

import {
  TreeItem,
  mapStateToProps,
} from '../TreeItem';

describe('TreeItem', () => {
  let state;
  let ownProps;
  let wrapper;
  let props;

  beforeEach(() => {
    state = {
      allIds: [{
        uuid: '1',
        name: 'Item 1'
      }, {
        uuid: '2',
        name: 'Item 2',
        parent: '1'
      }],
      selected: '1'
    };
    ownProps = {
      getAllIds: (state) => state.allIds,
      selectState: (state) => state,
      uuid: '1'
    };
    props = {
      uuid: '1',
      label: 'Item 1',
      selected: '1',
      childItems: [{
        uuid: '1',
        name: 'Item 2',
        parent: '1'
      }],
      getAllIds: jest.fn(),
      selectState: jest.fn(),
      onToggle: jest.fn()
    };
    wrapper = shallow(
      <TreeItem {...props} />
    );
  });

  it('should map state to props correctly', () => {
    expect(mapStateToProps(state, ownProps)).toEqual({
      childItems: [{
        uuid: '2',
        name: 'Item 2',
        parent: '1'
      }],
      selected: '1'
    });
  });

  it('should render container component', () => {
    expect(wrapper.name()).toEqual('div');
    expect(wrapper.hasClass('tree-item')).toEqual(true);
  });

  it('should render container for checkbox and label', () => {
    const container = wrapper.childAt(0);
    expect(container.name()).toEqual('div');
    expect(container.hasClass('tree-item__content')).toEqual(true);
  });

  it('renders a checkbox that calls "onToggle" when changed', () => {
    const checkbox = wrapper.childAt(0).childAt(0);
    expect(checkbox.name()).toEqual('input');
    expect(checkbox.prop('type')).toEqual('checkbox');
    expect(checkbox.prop('checked')).toEqual(true);

    checkbox.simulate('change', {
      target: {
        checked: true
      }
    });
    expect(props.onToggle).toHaveBeenCalledWith('1', true);
  });

  it('renders container for TreeItem components', () => {
    const container = wrapper.childAt(1);
    expect(container.name()).toEqual('div');
    expect(container.hasClass('tree-item__children')).toEqual(true);
  });
});
