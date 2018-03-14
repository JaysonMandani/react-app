import { IRobots } from 'models/robots';
import { IRecycleRobots } from 'models/recycleRobots';

export interface IStore {
  recycleRobots: IRecycleRobots;
  robots: IRobots;
};
