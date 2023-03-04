export interface IArea {
  indexArea: number;
  type: 'bomb' | 'number' | 'empty';
  value: number | null;
  isOpened: boolean;
}
