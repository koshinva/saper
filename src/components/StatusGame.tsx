import { FC } from 'react';

import {
  funnySmileOff,
  scaredSmile,
  times,
  deathSmile,
  coolSmile,
  funnySmileOn,
} from '../utils/constants';

import { TSmile } from '../types/smile.type';

import { getPadTime } from '../helpers/getPadTime';

interface IStatusGameProps {
  smile: TSmile;
  remainingTime: number;
  handleClickRefresh: () => void;
  handleMouseDownRefresh: () => void;
}

const StatusGame: FC<IStatusGameProps> = ({
  remainingTime,
  smile,
  handleClickRefresh,
  handleMouseDownRefresh,
}) => {
  const minutes = getPadTime(Math.floor(remainingTime / 60));
  const seconds = getPadTime(Math.floor(remainingTime % 60));

  const checkSmile = () => {
    if (smile === 'scared') return <img src={scaredSmile} alt="icon scared-smile" />;
    if (smile === 'death') return <img src={deathSmile} alt="death smile" />;
    if (smile === 'cool') return <img src={coolSmile} alt="cool smile" />;
    if (smile === 'funny-on') return <img src={funnySmileOn} alt="icon funny-smile-on" />;
    return <img src={funnySmileOff} alt="icon funny-smile-off" />;
  };

  return (
    <div className="game__status">
      <div className="game__time">
        {minutes.split('').map((elem: string, i: number) => (
          <img src={times[+elem]} alt="icon time" key={i} />
        ))}
      </div>

      <div
        className="game__status-icon"
        onClick={() => handleClickRefresh()}
        onMouseDown={() => handleMouseDownRefresh()}
      >
        {checkSmile()}
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
