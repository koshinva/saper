import { useEffect, useState } from 'react';

import Game from './components/Game';

import './App.css';

import { IArea, TSmile, TStatusGame } from './types';
import { createField, fillNeighbors, placeBombs, revealEmpty } from './utils';
import { COUNT_MINES, REMAINING_TIME, WIDTH_FIELD } from './config';

function App() {
  const [field, setField] = useState<IArea[]>(() => createField(WIDTH_FIELD));
  const [remainingTime, setRemainingTime] = useState<number>(REMAINING_TIME);
  const [isFirstClick, setFirstClick] = useState<boolean>(true);
  const [statusGame, setStatusGame] = useState<TStatusGame>('not started');
  const [smile, setSmile] = useState<TSmile>('funny-off');

  const handleClickOnContextMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    area: IArea
  ) => {
    event.preventDefault();
    setSmile('funny-off');
    const newField = field.map((a: IArea) =>
      a.id === area.id ? { ...a, isFlagged: a.isFlagged === 2 ? 0 : a.isFlagged + 1 } : a
    );
    setField(newField);
  };

  const handleMouseDownRefresh = () => {
    setSmile('funny-on');
  };

  const handleClickRefresh = () => {
    setFirstClick(true);
    setSmile('funny-off');
    setStatusGame('not started');
    setField(() => createField(WIDTH_FIELD));
    setRemainingTime(REMAINING_TIME);
  };

  const handleWhileMouseDown = () => {
    if (statusGame === 'loss' || statusGame === 'win') {
      return;
    }
    setSmile('scared');
  };

  const checkMove = (area: IArea) => {
    if (area.neighbor) {
      setField((prev) => [...prev.map((a) => (a.id === area.id ? { ...a, isOpened: true } : a))]);
      return;
    }
    if (area.isBomb) {
      setStatusGame('loss');
      setSmile('death');
      setField((prev) => [
        ...prev.map((a) => (a.id === area.id ? { ...a, isOpened: true, isRedBomb: true } : a)),
      ]);
      setField((prev) => [...prev.map((a) => (a.isBomb ? { ...a, isOpened: true } : a))]);
      return;
    }
    setField(revealEmpty(field, area));
  };

  const handleClickArea = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, area: IArea) => {
    if (area.isOpened || statusGame === 'loss' || statusGame === 'win') {
      return;
    }
    setSmile('funny-off');
    if (isFirstClick) {
      setFirstClick(false);
      const newField = fillNeighbors(placeBombs(COUNT_MINES, field, area.id));
      setField(newField);
      setStatusGame('started');
      if (area.neighbor) {
        setField((prev) => [...prev.map((a) => (a.id === area.id ? { ...a, isOpened: true } : a))]);
        return;
      } else {
        setField(revealEmpty(field, area));
      }
    } else {
      checkMove(area);
    }
  };

  useEffect(() => {
    if (field.filter((a) => a.isOpened).length === WIDTH_FIELD * WIDTH_FIELD - COUNT_MINES) {
      setStatusGame('win');
      setSmile('cool');
    }
  }, [field]);

  useEffect(() => {
    if (remainingTime === 0) {
      setStatusGame('loss');
      setSmile('death');
      setField((prev) => [...prev.map((a) => (a.isBomb ? { ...a, isOpened: true } : a))]);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (statusGame === 'started') {
      const intervalId = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [statusGame]);

  return (
    <div className="app">
      <div className="app__container">
        <Game
          field={field}
          smile={smile}
          remainingTime={remainingTime}
          handleClickArea={handleClickArea}
          handleClickOnContextMenu={handleClickOnContextMenu}
          handleWhileMouseDown={handleWhileMouseDown}
          handleClickRefresh={handleClickRefresh}
          handleMouseDownRefresh={handleMouseDownRefresh}
        />
      </div>
    </div>
  );
}

export default App;
