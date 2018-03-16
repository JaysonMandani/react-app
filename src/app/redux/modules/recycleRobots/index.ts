import { IRecycleRobots, IRecycleRobotsAction } from 'models/recycleRobots';

/** Action Types */
export const GET_REQUEST: string = 'robots/GET_REQUEST';
export const GET_SUCCESS: string = 'robots/GET_SUCCESS';
export const GET_FAILURE: string = 'robots/GET_FAILURE';

/** Initial State */
const initialState: IRecycleRobots = {
  isFetching: false,
};

/** Reducer */
export function recycleRobotsReducer(state = initialState, action: IRecycleRobotsAction) {
  switch (action.type) {
    case GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        recycleRobots: action.payload.recycleRobots !== undefined ? action.payload.recycleRobots : []
      });

    case GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        message: action.payload.message,
        error: true,
      });

    default:
      return state;
  }
}

export function getRecycleRobots() {
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

export function moveRobotToShip(robot_id) {
  return(dispatch) => {
    dispatch(robotsRequest());

  return fetch('http://localhost:3000/robots/' + robot_id + '/move_to_ship', {method: 'put'})
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

export function removeRobotToShip(robot_id) {
  return(dispatch) => {
    dispatch(robotsRequest());

    return fetch('http://localhost:3000/robots/' + robot_id + '/remove_to_ship', {method: 'put'})
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

export function extinguishRobots(robot_id) {
  return(dispatch) => {
    dispatch(robotsRequest());

    return fetch('http://localhost:3000/robots/' + robot_id + '/extinguish', {method: 'post'})
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

export function sendShipments() {
  return(dispatch) => {
    dispatch(robotsRequest());

    return fetch('http://localhost:3000/shipments', {method: 'post'})
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
export function robotsRequest(): IRecycleRobotsAction {
  return {
    type: GET_REQUEST,
  };
}

/** Action Creator */
export function robotsSuccess(recycleRobots: any): IRecycleRobotsAction {
  return {
    type: GET_SUCCESS,
    payload: {
      recycleRobots,
    },
  };
}

/** Action Creator */
export function recycleRobotsSuccess(recycleRobots: any): IRecycleRobotsAction {
  return {
    type: GET_SUCCESS,
    payload: {
      recycleRobots,
    },
  };
}

/** Action Creator */
export function robotsFailure(message: any): IRecycleRobotsAction {
  return {
    type: GET_FAILURE,
    payload: {
      message,
    },
  };
}
