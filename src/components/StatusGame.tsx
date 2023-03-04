import { FC } from 'react';

import { IRemainingTime } from '../types/remainingTime.types';
import { times } from '../utils/constants';

import deathSmile from '../image/death-smile.png';


const StatusGame: FC<{ remainingTime: IRemainingTime }> = ({ remainingTime }) => {
  const {minutes, seconds} = remainingTime;

  return (
    <div className="game__status">
      <div className="game__time">
        {minutes.split('').map((elem: string, i: number) => (
          <img src={times[+elem]} alt="icon time" key={i} />
        ))}
      </div>

      <div className="game__status-icon">
        <img src={deathSmile} alt="death smile" />
      </div>

      <div className="game__time">
        {seconds.split('').map((elem: string, i: number) => (
          <img src={times[+elem]} alt="icon time" key={i} />
        ))}
      </div>
    </div>
  );
};

export default StatusGame;
