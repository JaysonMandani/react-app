import * as React from 'react';
import { getRecycleRobots, moveRobotToShip, removeRobotToShip, sendShipments, extinguishRobots } from 'modules/recycleRobots';
import { IRecycleRobots, IRecycleRobotsAction } from 'models/recycleRobots';
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
    const { recycleRobots } = this.props.recycleRobots;
    const passedRobots  = recycleRobots.passed;
    const notPassedRobots = recycleRobots.not_passed;
    const shipReadyRobots = recycleRobots.ship_ready;
    const passedList = passedRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td><button name="moveToShip" onClick={e => {e.preventDefault(); this.props.moveRobotToShip(robot.id)}}>Add to shipment</button></td>
      </tr>,
    );
    const shipReadyList = shipReadyRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td><button name="removeToShip" onClick={e => {e.preventDefault(); this.props.removeRobotToShip(robot.id)}}>Remove to shipment</button></td>
      </tr>,
    );
    const notPassedList = notPassedRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td>{robot.status}</td>
      </tr>,
    );

    return (
      <div className={style.RecycleProcess}>
        <section id="passed">
          <h2>Passed QA</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Number Of Rotors</th>
                <th>Colour</th>
              </tr>
            </thead>
            <tbody>
              {passedList}
            </tbody>
          </table>
        </section>
        <section id="passed">
          <h2>Ready to Ship</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Number Of Rotors</th>
                <th>Colour</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shipReadyList}
            </tbody>
          </table>
          <button name="removeToShip" onClick={e => {e.preventDefault(); this.props.sendShipments()}}>Send shipment</button>
        </section>
        <section id="notPassed">
          <h2>Factory seconds</h2>
          <button name="extinguishRobots" onClick={e => {e.preventDefault(); this.extinguishProcess()}}>Extinguish Robots</button>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Number Of Rotors</th>
                <th>Colour</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notPassedList}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export { RecycleProcess }
