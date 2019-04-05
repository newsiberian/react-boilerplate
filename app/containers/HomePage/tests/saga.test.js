/**
 * Tests for HomePage sagas
 */

import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import { DROP_DRAGGABLE } from '../constants';
import githubData, { getDraggableState, getRepos, dndSaga } from '../saga';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_REPOS, getRepos));
  });
});

describe('getDraggableState', () => {
  it('should call console.log with correct payload', () => {
    const spy = jest.spyOn(global.console, 'log');
    const getDraggableStateData = getDraggableState({
      id: '1',
      top: 1,
      left: 1,
    });
    expect(spy).not.toHaveBeenCalled();
    getDraggableStateData.next();
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      top: 1,
      left: 1,
    });
  });
});

describe('dndSaga Saga', () => {
  const dndDataSaga = dndSaga();
  it('should start task to watch for DROP_DRAGGABLE action', () => {
    const takeEveryDescriptor = dndDataSaga.next().value;
    expect(takeEveryDescriptor).toEqual(
      takeEvery(DROP_DRAGGABLE, getDraggableState),
    );
  });
});
