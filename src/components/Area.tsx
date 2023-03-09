import { FC } from 'react';
import { IArea } from '../types';
import {
  flag,
  areaOff,
  bomb,
  countBombs,
  areaOn,
  questionMarkOff,
  bombRed,
} from '../utils/constants';

interface IAreaProps {
  area: IArea;
  handleClickArea: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, area: IArea) => void;
  handleClickOnContextMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    area: IArea
  ) => void;
  handleWhileMouseDown: () => void;
}

const Area: FC<IAreaProps> = ({
  area,
  handleClickArea,
  handleClickOnContextMenu,
  handleWhileMouseDown,
}) => {
  const checkAreaImage = () => {
    if (!area.isOpened && area.isFlagged === 1) return <img src={flag} alt="icon flag" />;
    if (!area.isOpened && area.isFlagged === 2)
      return <img src={questionMarkOff} alt="icon question-off" />;
    if (area.isOpened && area.isBomb && area.isRedBomb)
      return <img src={bombRed} alt="icon bomb-red" />;
    if (area.isOpened && area.isBomb) return <img src={bomb} alt="icon bomb" />;
    if (area.isOpened && area.neighbor)
      return <img src={countBombs[area.neighbor - 1]} alt="icon count bomb" />;
    if (area.isOpened) return <img src={areaOn} alt="icon area on" />;
    return <img src={areaOff} alt="icon area off" />;
  };

  const onClickArea = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    handleClickArea(event, area);
  };

  return (
    <button
      type="button"
      className="game__area"
      onClick={onClickArea}
      onContextMenu={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleClickOnContextMenu(event, area)
      }
      onMouseDown={() => handleWhileMouseDown()}
    >
      {checkAreaImage()}
    </button>
  );
};

export default Area;
