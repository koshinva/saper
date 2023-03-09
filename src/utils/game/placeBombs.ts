import { IArea } from "../../types/area.interface";

export const placeBombs = (countBombs: number, field: IArea[], idFirstClick: number): IArea[] => {
  const fieldLength = field.length;
  const arrRandomId: number[] = [];

  while (arrRandomId.length < countBombs) {
    const randomId = Math.floor(Math.random() * fieldLength);
    if (arrRandomId.includes(randomId) || randomId === idFirstClick) {
      continue;
    }
    arrRandomId.push(randomId);
  }
  const fieldWithBombs = field.map((area) => arrRandomId.includes(area.id) ? {...area, isBomb: true} : area);
  
  return fieldWithBombs;
};
