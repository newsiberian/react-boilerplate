/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState, initialDraggableState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const selectDnd = state => state.get('dnd', initialDraggableState);

const makeSelectDnd = () =>
  createSelector(selectDnd, dndState => dndState.toObject());

export { selectHome, makeSelectUsername, selectDnd, makeSelectDnd };
