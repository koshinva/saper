import { IArea } from '../../types/area.interface';

export const traverseBoard = (field: IArea[], index: number, width: number = 16): IArea[] => {
  const leftTopIndex = index === 0;
  const rightTopIndex = index === width - 1;
  const leftBottomIndex = index === width * (width - 1);
  const rightBottomIndex = index === width * width - 1;
  const leftSide = index % width === 0;
  const rightSide = index % width === width - 1;
  const topSide = index < width;
  const bottomSide = index > width * (width - 1);


  const getAreaAround = (arrIndex: number[]) => {
    const result: IArea[] = [];
    arrIndex.map((i) => index + i).forEach((i) => result.push(field[i]));
    return result;
  };

  const indexAround = [-width, -width + 1, 1, width + 1, width, width - 1, -1, -width - 1];

  if (leftTopIndex) {
    return getAreaAround(indexAround.slice(2, 5));
  } else if (rightTopIndex) {
    return getAreaAround(indexAround.slice(4, 7));
  } else if (leftBottomIndex) {
    return getAreaAround(indexAround.slice(0, 3));
  } else if (rightBottomIndex) {
    return getAreaAround([...indexAround.slice(6), indexAround[0]]);
  } else if (topSide) {
    return getAreaAround(indexAround.slice(2, 7));
  } else if (bottomSide) {
    return getAreaAround([...indexAround.slice(6), ...indexAround.slice(0, 3)]);
  } else if (leftSide) {
    return getAreaAround(indexAround.slice(0, 5));
  } else if (rightSide) {
    return getAreaAround([...indexAround.slice(4), indexAround[0]]);
  } else {
    return getAreaAround(indexAround);
  }
};

export const fillNeighbors = (field: IArea[]): IArea[] => {
  const newFieldWithNeighbors = [...field];
  newFieldWithNeighbors.forEach((area, index) => {
    if (area.isBomb) return;
    const countBomb = traverseBoard(field, index).filter((area) => area.isBomb).length;
    area.neighbor = countBomb;
  });
  return newFieldWithNeighbors;
};
