import { FC } from 'react';
import { IArea } from '../types/area.interface';
import './Game.css';

import areaOff from '../image/area-off.png';
import StatusGame from './StatusGame';
import { IRemainingTime } from '../types/remainingTime.types';

interface IGameProps {
  areas: IArea[];
  remainingTime: IRemainingTime;
  handleClickArea: (index: number) => void;
}

const Game: FC<IGameProps> = ({ areas, remainingTime, handleClickArea }) => {
  return (
    <div className="game">
      <StatusGame remainingTime={remainingTime} />
      <div className="game__border"></div>
      <div className="game__areas">
        {areas.map((area) => (
          <button
            key={area.indexArea}
            type="button"
            className="game__area"
            onClick={() => handleClickArea(area.indexArea)}
          >
            {!area.isOpened && <img src={areaOff} alt="icon area off" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
