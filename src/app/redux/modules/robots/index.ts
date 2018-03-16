import { IRobots, IRobotsAction } from 'models/robots';

/** Action Types */
export const GET_REQUEST: string = 'robots/GET_REQUEST';
export const GET_SUCCESS: string = 'robots/GET_SUCCESS';
export const GET_FAILURE: string = 'robots/GET_FAILURE';

/** Initial State */
const initialState: IRobots = {
  isFetching: false,
};

/** Reducer */
export function robotsReducer(state = initialState, action: IRobotsAction) {
  switch (action.type) {
    case GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        robots: action.payload.robots !== undefined ? action.payload.robots : []
      });

    case GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        robots: [],
        message: action.payload.message,
        error: true,
      });

    default:
      return state;
  }
}

export function getRobots() {
  return(dispatch) => {
    dispatch(robotsRequest());

    return fetch('http://localhost:3000/robots')
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((res) => dispatch(robotsSuccess(res)));
        } else {
          return res.json()
            .then((res) => dispatch(robotsFailure(res)));
        }
      })
      .catch((err) => dispatch(robotsFailure(err)));
  };
}

export function recycleRobots() {
  return(dispatch) => {
    dispatch(robotsRequest());

    return fetch('http://localhost:3000/robots/recycle', {method: 'post'})
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((res) => dispatch(recycleRobotsSuccess(res)));
        } else {
          return res.json()
            .then((res) => dispatch(robotsFailure(res)));
        }
      })
      .catch((err) => dispatch(robotsFailure(err)));
  };
}

/** Action Creator */
export function robotsRequest(): IRobotsAction {
  return {
    type: GET_REQUEST,
  };
}

/** Action Creator */
export function robotsSuccess(robots: any): IRobotsAction {
  return {
    type: GET_SUCCESS,
    payload: {
      robots,
    },
  };
}

/** Action Creator */
export function recycleRobotsSuccess(recycleRobots: any): IRobotsAction {
  return {
    type: GET_SUCCESS,
    payload: {
      recycleRobots,
    },
  };
}

/** Action Creator */
export function robotsFailure(message: any): IRobotsAction {
  return {
    type: GET_FAILURE,
    payload: {
      message,
    },
  };
}
