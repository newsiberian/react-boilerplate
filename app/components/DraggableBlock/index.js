import React from 'react';
import { DragSource } from 'react-dnd';
import styled, { css } from 'styled-components';

import Draggable from './Draggable';
import { DRAGGABLE } from '../../containers/HomePage/constants';

const draggableSource = {
  beginDrag: props => ({ id: props.id }),
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

const StyledDraggableBlock = styled(Draggable)`
  width: 100px;
  height: 100px;
  cursor: move;
  z-index: 1;

  ${({ color, isDragging, top, left }) => css`
    background: ${color};
    opacity: ${isDragging ? 0.5 : 1};
    position: ${typeof top === 'number' ? 'fixed' : 'static'};
    top: ${typeof top === 'number' ? `${top}px` : 'auto'};
    left: ${typeof left === 'number' ? `${left}px` : 'auto'};
  `};
`;

export default DragSource(DRAGGABLE, draggableSource, collect)(
  StyledDraggableBlock,
);
