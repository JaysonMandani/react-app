import * as React from 'react';
import { getRecycleRobots } from 'modules/recycleRobots';
import { IRecycleRobots, IRecycleRobotsAction } from 'models/recycleRobots';
const _ = require('lodash');
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');
const style = require('./style.css');

interface IProps {
  recycleRobots: IRecycleRobots;
  getRecycleRobots: Redux.ActionCreator<IRecycleRobotsAction>;
}

@asyncConnect([{
  promise: ({ store: { dispatch }}) => {
    return dispatch(getRecycleRobots());
  },
}])

@connect(
  (state) => ({ recycleRobots: state.recycleRobots }),
)

class RecycleProcess extends React.Component<IProps, {}> {
  public render() {
    console.log('lodash', _)
    const { recycleRobots } = this.props.recycleRobots;
    const passedRobots  = recycleRobots.passed;
    const notPassedRobots = recycleRobots.not_passed;
    const passedList = passedRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
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
              {passedList}
            </tbody>
          </table>
        </section>
        <section id="notPassed">
          <h2>Factory seconds</h2>
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
