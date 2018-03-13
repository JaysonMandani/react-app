import * as React from 'react';
import { getRobots } from 'modules/robots';
import { IRobots, IRobotsAction } from 'models/robots';
const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');
const style = require('./style.css');

interface IProps {
  robots: IRobots;
  getRobots: Redux.ActionCreator<IRobotsAction>;
}

@asyncConnect([{
  promise: ({ store: { dispatch }}) => {
    return dispatch(getRobots());
  },
}])

@connect(
  (state) => ({ robots: state.robots }),
)

class Home extends React.Component<IProps, {}> {
  public render() {
    const { robots } = this.props.robots;
    const tableList = robots.map((robot) =>
      <tr key={robot.id}>
        <td>{robot.id}</td>
        <td>{robot.name}</td>
        <td>{robot.number_of_rotors}</td>
        <td>{robot.colour}</td>
        <td>{robot.status}</td>
      </tr>,
    );
    return (
      <div className={style.Home}>
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
            {tableList}
          </tbody>
        </table>
      </div>
    );
  }
}

export { Home }
