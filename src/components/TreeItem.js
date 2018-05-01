import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const TreeItem = ({ uuid, label, selected, childItems, getAllIds, selectState, onToggle }) => (
  <div className="tree-item">
    <div className="tree-item__content">
      <input
        type="checkbox"
        checked={uuid === selected}
        onChange={e => onToggle(uuid, e.target.checked)}
      />
      {label}
    </div>

    <div className="tree-item__children">
      {childItems.length > 0 && childItems.map((item) => (
        <ConnectedTreeItem
          key={item.uuid}
          uuid={item.uuid}
          label={item.name}
          getAllIds={getAllIds}
          selectState={selectState}
          onToggle={onToggle}
        />
      ))}
    </div>
  </div>
);

TreeItem.defaultProps = {
  childItems: []
};

TreeItem.propTypes = {
  uuid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.string,
  childItems: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  getAllIds: PropTypes.func.isRequired,
  selectState: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export const mapStateToProps = (state, ownProps) => ({
  childItems: ownProps.getAllIds(state).filter(
    (item) => item.parent === ownProps.uuid
  ),
  selected: ownProps.selectState(state).selected
});

const ConnectedTreeItem = connect(mapStateToProps)(TreeItem);

export default ConnectedTreeItem;
