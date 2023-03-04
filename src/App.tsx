import { useEffect, useRef, useState } from 'react';
import Game from './components/Game';
import './App.css';
import { IArea } from './types/area.interface';
import { IRemainingTime } from './types/remainingTime.types';
import { getRemainingTime } from './utils/countDownTimerUtils';

const createArea = (): IArea[] => {
  const result = new Array(256)
    .fill(null)
    .map((_, i) => ({ indexArea: i, type: 'empty', value: null, isOpened: false } as IArea));
  return result;
};

const placeBombs = (quantity: number, areas: IArea[], indexFirstClickArea: number): any => {
  const areaLength = areas.length;
  const arrRandomIndex: number[] = [];

  while (arrRandomIndex.length <= quantity) {
    const randomIndex: number = Math.floor(Math.random() * areaLength);
    if (arrRandomIndex.includes(randomIndex) || randomIndex === indexFirstClickArea) {
      continue;
    }
    arrRandomIndex.push(randomIndex);
  }
  const areasWithBombs = areas.map((element) =>
    arrRandomIndex.includes(element.indexArea) ? ({ ...element, type: 'bomb' } as IArea) : element
  );
  const areasAround = [1, -1, 16, -16, -17, 17, -15, 15]
  areasWithBombs.forEach((area) => {
    let countBombsAround = 0;
    areasAround.forEach((areaAround) => {
      const areaFound = areasWithBombs.find((a) => a.indexArea === a.indexArea + areaAround);
      if (areaFound && areaFound.type === 'bomb') {
        countBombsAround =+ 1;
      }
    })
  })
};

const defaultRemainingTime: IRemainingTime = {
  minutes: '040',
  seconds: '000',
};
// const countDownTimeStampMs = +Date.now() + 40 * 60 * 1000;

function App() {
  const [areas, setAreas] = useState<IArea[]>(() => createArea());
  const [remainingTime, setRemainingTime] = useState<IRemainingTime>(defaultRemainingTime);
  const [isFirstClick, setFirstClick] = useState(true);
  const [statusGame, setStatusGame] = useState('not started');

  const updateRemainingTime = (countDownTimeStamp: number) => {
    setRemainingTime(getRemainingTime(countDownTimeStamp));
  };

  const handleClickArea = (index: number) => {
    if (isFirstClick) {
      setFirstClick(false);
      // setAreas(() => placeBombs(40, areas, index));
      setStatusGame('started');
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (statusGame === 'started') {
      intervalId = setInterval(() => {
        updateRemainingTime(+Date.now() + 40 * 60 * 1000);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [statusGame]);

  return (
    <div className="app">
      <div className="app__container">
        <Game areas={areas} remainingTime={remainingTime} handleClickArea={handleClickArea} />
      </div>
    </div>
  );
}

export default App;
