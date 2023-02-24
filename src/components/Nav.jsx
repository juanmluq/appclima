import React from 'react';
import SearchBar from './SearchBar.jsx';
import {Link, NavLink} from 'react-router-dom';
import './Nav.css';
import About from './About';

function Nav({onSearch}) {
  return (
    <nav className="nav nav-tabs">
         <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/">Wheather App</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/about">Acerca de mi</a>
  </li>
        <div className='search'>
          <SearchBar
          onSearch={onSearch}
        />
        </div>
    </nav>
  );
};

export default Nav;
