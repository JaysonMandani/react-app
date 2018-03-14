import * as React from 'react';
import { Link } from 'react-router';

const style = require('./style.css');

export const Header = () => (
  <nav className={style.Nav}>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="recycleProcess">RecycleProcess</Link></li>
    </ul>
  </nav>
);
