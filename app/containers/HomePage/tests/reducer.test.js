import { fromJS, Map } from 'immutable';

import { dragReducer, homeReducer } from '../reducer';
import { dropDraggable, changeUsername } from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('username', fixture);

    expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });
});

describe('dragReducer', () => {
  let state;
  beforeEach(() => {
    state = Map({
      '1': { top: null, left: null },
      '2': { top: null, left: null },
      '3': { top: null, left: null },
    });
  });

  it('should return the initial state', () => {
    expect(dragReducer(undefined, {})).toEqual(state);
  });

  it('should return changed draggable position correctly', () => {
    const payload = { id: '1', top: 1, left: 1 };
    const expectedResult = state.update(payload.id, () => ({
      top: payload.top,
      left: payload.left,
    }));

    expect(dragReducer(state, dropDraggable(payload))).toEqual(expectedResult);
  });
});
