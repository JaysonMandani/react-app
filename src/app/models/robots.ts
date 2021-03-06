export interface IRobots {
  isFetching?: boolean;
  robots?: any;
  recycleRobots?: any;
  error?: boolean;
  message?: any;
}

export interface IRobotsAction {
  type: string;
  payload?: {
    robots?: any;
    recycleRobots?: any;
    message?: any;
  };
}
