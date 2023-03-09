import { IArea } from '../../types/area.interface';

export const createField = (width: number) => {
  const field = new Array(width * width)
    .fill(null)
    .map((_, i) => ({id: i, isBomb: false, isRedBomb: false, isFlagged: 0, isOpened: false, neighbor: 0 } as IArea));

  return field;
};
