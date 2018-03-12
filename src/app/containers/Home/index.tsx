import * as React from 'react';
import { recycleRobots } from 'modules/robots';
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
    return dispatch(recycleRobots());
  },
}])

@connect(
  (state) => ({ robots: state.robots }),
)

class Home extends React.Component<IProps, {}> {
  public render() {
    console.log('wew', this.props);
    return (
      <div className={style.Home}>
        <p>Hello!</p>
      </div>
    );
  }
}

export { Home }
