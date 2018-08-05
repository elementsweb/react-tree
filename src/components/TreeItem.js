import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = theme => ({
  treeItem: {
    marginLeft: theme.spacing.unit * 4,
  },
  iconButton: {
    height: 36,
    width: 36,
    marginLeft: -36 - (theme.spacing.unit / 2),
    marginRight: theme.spacing.unit / 2,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconButtonExpanded: {
    transform: 'rotate(180deg)'
  },
  checkbox: {
    height: 36,
    width: 36,
  },
});

export class TreeItem extends React.Component {
  state = {
    open: false,
  }

  handleChange = e => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { classes, uuid, label, selected, childItems, getAllIds, selectState, onToggle } = this.props;

    return (
      <div className={classes.treeItem}>
        <div>
          {childItems.length > 0 && (
            <IconButton
              className={classes.iconButton}
              onClick={this.handleChange}
              aria-label="Expand"
              disableRipple
            >
              <KeyboardArrowDownIcon className={this.state.open && classes.iconButtonExpanded} />
            </IconButton>
          )}
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkbox}
                checked={selected.indexOf(uuid) !== -1}
                onChange={e => onToggle(uuid, e.target.checked)}
              />
            }
            label={label}
          />
        </div>

        <Collapse in={this.state.open}>
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
        </Collapse>
      </div>
    )
  }
}

TreeItem.defaultProps = {
  childItems: []
};

TreeItem.propTypes = {
  classes: PropTypes.shape({
    treeItem: PropTypes.string,
    iconButton: PropTypes.string,
    iconButtonExpanded: PropTypes.string,
    checkbox: PropTypes.string,
  }).isRequired,
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

const ConnectedTreeItem = compose(
  withStyles(styles),
  connect(mapStateToProps),
)(TreeItem);

export default ConnectedTreeItem;
