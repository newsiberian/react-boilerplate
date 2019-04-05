import { fromJS, Map } from 'immutable';

import {
  selectDnd,
  selectHome,
  makeSelectDnd,
  makeSelectUsername,
} from '../selectors';

describe('selectDnd', () => {
  it('should should select the dnd state', () => {
    const dnd = {
      '1': { top: 30, left: 20 },
      '2': { top: 10, left: 15 },
      '3': { top: 50, left: 5 },
    };
    expect(
      selectDnd(
        fromJS({
          dnd: Map(dnd),
        }),
      ),
    ).toEqual(Map(dnd));
  });
});

describe('makeSelectDnd', () => {
  const dndSelector = makeSelectDnd();
  it('should select the dnd map', () => {
    const dnd = {
      1: { top: 30, left: 20 },
      2: { top: 10, left: 15 },
      3: { top: 50, left: 5 },
    };
    expect(
      dndSelector(
        fromJS({
          dnd: Map(dnd),
        }),
      ),
    ).toEqual(dnd);
  });
});

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      home: {
        username,
      },
    });
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
