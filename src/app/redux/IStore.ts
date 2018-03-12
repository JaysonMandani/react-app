import { ICounter } from 'models/counter';
import { IRobots } from 'models/robots';

export interface IStore {
  counter: ICounter;
  robots: IRobots;
};
