import * as React from 'react';
const _ = require('lodash');
const style = require('./style.css');

class NotPassedList extends React.Component<any, any> {
  extinguishProcess() {
    const { extinguishRobots, robotIds } = this.props;

    _.forEach(robotIds, function(robot_id) {
      extinguishRobots(robot_id);
    });
  }
  public render() {
    const { recycleRobots } = this.props;
    const notPassedRobots  = _.sortBy(recycleRobots.not_passed, ['name']);
    const onFireRobots = [];
    _.forEach(notPassedRobots, function(robot) {
      if (robot.status == 'on fire') {
        onFireRobots.push(robot);
      }
    });

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
      <section id="notPassed" className={style.RecycleProcess}>
        <h2>Factory seconds</h2>
        <button disabled={onFireRobots.length <= 0} name="extinguishRobots" onClick={e => {e.preventDefault(); this.extinguishProcess()}}>Extinguish Robots</button>
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
    );
  }
}

export { NotPassedList }
