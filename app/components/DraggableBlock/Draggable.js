import React from 'react';
import PropTypes from 'prop-types';

export default class Draggable extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const { className, connectDragSource } = this.props;
    return <div ref={connectDragSource} className={className} />;
  }
}
