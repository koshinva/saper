import { IArea } from '../../types';
import { traverseBoard } from './fillNeighbors';

export const revealEmpty = (field: IArea[], area: IArea) => {
  
  const newField = JSON.parse(JSON.stringify(field));
  
  newField[area.id].isOpened = true;
  
  const stack: IArea[] = [area];

  
  while (stack.length > 0) {
    const elemFromStack = stack.pop();
    if (elemFromStack) {
      const areasAround = traverseBoard(newField, elemFromStack.id);

      for (const areaAround of areasAround) {
        if (newField[areaAround.id].isOpened) continue;
        if (!newField[areaAround.id].isBomb) {
          newField[areaAround.id].isOpened = true;
          if (newField[areaAround.id].neighbor) continue;
          stack.push(areaAround);
        }
      }
    }
  }

  return newField;
};
