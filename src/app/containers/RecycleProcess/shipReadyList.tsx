import * as React from 'react';
const _ = require('lodash');
const style = require('./style.css');

class ShipReadyList extends React.Component<any, any> {
  public render() {
    const { recycleRobots, sendShipments, removeRobotToShip } = this.props;
    const shipReadyRobots = _.sortBy(recycleRobots.ship_ready, ['name']);

    const shipReadyList = shipReadyRobots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td><button name="removeToShip" onClick={e => {e.preventDefault(); removeRobotToShip(robot.id)}}>Remove to shipment</button></td>
      </tr>,
    );

    return (
      <section id="shipReady" className={style.RecycleProcess}>
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
        <button name="sendShipment" disabled={shipReadyRobots.length <= 0} onClick={e => {e.preventDefault(); sendShipments()}}>Send shipment</button>
      </section>
    );
  }
}

export { ShipReadyList }
