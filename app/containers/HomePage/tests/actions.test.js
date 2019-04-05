import { DROP_DRAGGABLE, CHANGE_USERNAME } from '../constants';

import { dropDraggable, changeUsername } from '../actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_USERNAME,
        name: fixture,
      };

      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
  });

  describe('dropDraggable', () => {
    it('should return the correct type', () => {
      const payload = { id: '1', top: 1, left: 1 };
      expect(dropDraggable(payload)).toEqual({
        ...payload,
        type: DROP_DRAGGABLE,
      });
    });

    it('should return top, left of type "number"', () => {
      const payload = { id: '1', top: 1, left: 1 };
      expect(dropDraggable(payload)).toEqual(
        expect.objectContaining({
          top: expect.any(Number),
          left: expect.any(Number),
        }),
      );
    });
  });
});
