import dayjs from 'dayjs';
import { getPadTime } from '../helpers/getPadTime';
import { IRemainingTime } from '../types/remainingTime.types';

const getRemainingSeconds = (nowDayjs: dayjs.Dayjs, timeStampDayjs: dayjs.Dayjs) => {
  return getPadTime(timeStampDayjs.diff(nowDayjs, 'seconds') % 60);
};

const getRemainingMinutes = (nowDayjs: dayjs.Dayjs, timeStampDayjs: dayjs.Dayjs) => {
  return getPadTime(timeStampDayjs.diff(nowDayjs, 'minutes') % 60);
};

export const getRemainingTime = (timeStampsMs: number): IRemainingTime => {
  const timeStampDayjs = dayjs(timeStampsMs);
  const nowDayjs = dayjs();
  if (timeStampDayjs.isBefore(nowDayjs)) {
    return {
      minutes: '000',
      seconds: '000',
    };
  }
  return {
    minutes: getRemainingMinutes(nowDayjs, timeStampDayjs),
    seconds: getRemainingSeconds(nowDayjs, timeStampDayjs),
  };
};
