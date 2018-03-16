import * as React from 'react';
const _ = require('lodash');
const style = require('./style.css');

class PassedList extends React.Component<any, any> {
  public render() {
    const { recycleRobots, moveRobotToShip } = this.props;
    const passedRobots  = _.sortBy(recycleRobots.passed, ['name']);

    const passedList = passedRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td><button name="moveToShip" onClick={e => {e.preventDefault(); moveRobotToShip(robot.id)}}>Add to shipment</button></td>
      </tr>,
    );

    return (
      <section id="passed" className={style.RecycleProcess}>
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
    );
  }
}

export { PassedList }
