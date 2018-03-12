export interface IRobots {
  isFetching?: boolean;
  count?: number;
  error?: boolean;
  message?: any;
}

export interface IRobotsAction {
  type: string;
  payload?: {
    robots?: any;
    message?: any;
  };
}
