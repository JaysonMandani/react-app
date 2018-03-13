export interface IRecycleRobots {
  isFetching?: boolean;
  recycleRobots?: any;
  error?: boolean;
  message?: any;
}

export interface IRecycleRobotsAction {
  type: string;
  payload?: {
    recycleRobots?: any;
    message?: any;
  };
}
