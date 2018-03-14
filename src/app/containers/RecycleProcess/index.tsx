import * as React from 'react';
import { getRecycleRobots } from 'modules/recycleRobots';
import { IRecycleRobots, IRecycleRobotsAction } from 'models/recycleRobots';
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
    const { recycleRobots } = this.props.recycleRobots;
    const passedRobots  = recycleRobots.passed;
    const notPassedRobots = recycleRobots.not_passed;
    const passedList = passedRobots.map((robot) =>
      <li key={robot.id}>{robot.name}</li>
    );
    const notPassedList = notPassedRobots.map((robot) =>
      <li key={robot.id}>{robot.name}</li>
    );

    return (
      <div className={style.RecycleProcess}>
        <section id="passed">
          <h4>Passed QA</h4>
          <ul>
            {passedList}
          </ul>
        </section>
        <section id="notPassed">
          <h4>Factory seconds</h4>
          <ul>
            {notPassedList}
          </ul>
        </section>
      </div>
    );
  }
}

export { RecycleProcess }
