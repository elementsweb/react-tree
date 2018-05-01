import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TreeItem from './TreeItem';
import { selectItem } from '../actions/tree-item';

export class Tree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.allIds.filter(item => !item.parent)
    }
  }

  render() {
    const { items } = this.state;
    const { selected, selectAllIds, selectState, selectItem } = this.props;

    return (
      <div className="tree">
        {items.map((item) => (
          <TreeItem
            key={item.uuid}
            uuid={item.uuid}
            label={item.name}
            selected={selected}
            getAllIds={selectAllIds}
            selectState={selectState}
            onToggle={selectItem}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {};

export const mapStateToProps = (state, ownProps) => ({
  allIds: ownProps.selectAllIds(state)
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  selectItem: (uuid, value) => dispatch(selectItem(ownProps.namespace, uuid, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
