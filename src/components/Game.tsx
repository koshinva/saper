import { FC } from 'react';

import './Game.css';

import StatusGame from './StatusGame';
import Area from './Area';

import { IArea, TSmile } from '../types';

interface IGameProps {
  field: IArea[];
  smile: TSmile;
  remainingTime: number;
  handleClickArea: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, area: IArea) => void;
  handleClickOnContextMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    area: IArea
  ) => void;
  handleWhileMouseDown: () => void;
  handleClickRefresh: () => void;
  handleMouseDownRefresh: () => void;
}

const Game: FC<IGameProps> = ({
  field,
  smile,
  remainingTime,
  handleClickArea,
  handleClickOnContextMenu,
  handleWhileMouseDown,
  handleClickRefresh,
  handleMouseDownRefresh,
}) => {
  return (
    <div className="game">
      <StatusGame
        remainingTime={remainingTime}
        smile={smile}
        handleClickRefresh={handleClickRefresh}
        handleMouseDownRefresh={handleMouseDownRefresh}
      />
      <div className="game__border"></div>
      <div className="game__areas">
        {field.map((area) => (
          <Area
            key={area.id}
            area={area}
            handleClickArea={handleClickArea}
            handleClickOnContextMenu={handleClickOnContextMenu}
            handleWhileMouseDown={handleWhileMouseDown}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
