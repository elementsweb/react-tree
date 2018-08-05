import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';

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
      classes: {
        treeItem: 'treeItem-class',
        iconButton: 'iconButton-class',
        iconButtonExpanded: 'iconButtonExpanded-class',
        checkbox: 'checkbox-class',
      },
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
    expect(wrapper.hasClass('treeItem-class')).toEqual(true);
  });

  it('should render container for checkbox and label', () => {
    const container = wrapper.childAt(0);
    expect(container.name()).toEqual('div');
  });

  it('renders a checkbox that calls "onToggle" when changed', () => {
    const checkboxJSON = wrapper.find(FormControlLabel).props().control;
    const checkbox = shallow(checkboxJSON);

    expect(checkbox.prop('className')).toEqual('checkbox-class');
    expect(checkbox.prop('checked')).toEqual(true);
    expect(checkbox.prop('onChange')).toEqual(expect.any(Function));

    checkbox.simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(props.onToggle).toHaveBeenCalledWith('1', true);
  });

  it('renders Collapse component for TreeItem components', () => {
    const container = wrapper.find(Collapse);
    expect(container.children().length).toEqual(1);
  });
});
