import * as React from 'react';
import { getRecycleRobots, moveRobotToShip, removeRobotToShip, sendShipments, extinguishRobots } from 'modules/recycleRobots';
import { IRecycleRobots, IRecycleRobotsAction } from 'models/recycleRobots';
import { PassedList } from './passedList';
import { NotPassedList } from './notPassedList';
import { ShipReadyList } from './shipReadyList';
const _ = require('lodash');
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');
const style = require('./style.css');

interface IProps {
  recycleRobots: IRecycleRobots;
  getRecycleRobots: Redux.ActionCreator<IRecycleRobotsAction>;
  moveRobotToShip: Redux.ActionCreator<IRecycleRobotsAction>;
  removeRobotToShip: Redux.ActionCreator<IRecycleRobotsAction>;
  sendShipments: Redux.ActionCreator<IRecycleRobotsAction>;
  extinguishRobots: Redux.ActionCreator<IRecycleRobotsAction>;
}

@asyncConnect([{
  promise: ({ store: { dispatch }}) => {
    return dispatch(getRecycleRobots());
  },
}])

@connect(
  (state) => ({ recycleRobots: state.recycleRobots }),
  (dispatch) => ({
    moveRobotToShip: (id) => dispatch(moveRobotToShip(id)),
    removeRobotToShip: (id) => dispatch(removeRobotToShip(id)),
    sendShipments: () => dispatch(sendShipments()),
    extinguishRobots: (id) => dispatch(extinguishRobots(id)),
  }),
)

class RecycleProcess extends React.Component<IProps, {}> {
  extinguishProcess() {
    const { recycleRobots } = this.props.recycleRobots;
    const robot_ids = recycleRobots.recycleRobots;
    const properties = this.props;

    _.forEach(robot_ids, function(robot_id) {
      properties.extinguishRobots(robot_id);
    });
  }
  public render() {
    const { moveRobotToShip, removeRobotToShip, sendShipments, extinguishRobots } = this.props;
    const { recycleRobots } = this.props.recycleRobots;

    return (
      <div className={style.RecycleProcess}>
        <PassedList recycleRobots={recycleRobots} moveRobotToShip={moveRobotToShip} />
        <ShipReadyList recycleRobots={recycleRobots} sendShipments={sendShipments} removeRobotToShip={removeRobotToShip} />
        <NotPassedList robotIds={recycleRobots.recycleRobots} recycleRobots={recycleRobots} extinguishRobots={extinguishRobots} />
      </div>
    );
  }
}

export { RecycleProcess }
