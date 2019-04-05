/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, Map } from 'immutable';

import { CHANGE_USERNAME, DROP_DRAGGABLE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
});

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export const initialDraggableState = Map({
  1: { top: null, left: null },
  2: { top: null, left: null },
  3: { top: null, left: null },
});

export function dragReducer(state = initialDraggableState, action) {
  switch (action.type) {
    case DROP_DRAGGABLE:
      return state.update(action.id, () => ({
        top: action.top,
        left: action.left,
      }));
    default:
      return state;
  }
}
