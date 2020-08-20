import React from 'react';
import statusesIcon from '../../assets/statuses.svg';
import searchIcon from '../../assets/search.svg';
import sortIcon from '../../assets/sort.svg';
import filterIcon from '../../assets/filter.svg';
import './ToolBar.css';

function ToolBar() {
  return (
    <div className='board'>
      <div className='boardHeader'>
        <div className='statusesContainer iconContainer'>
          <img
            src={statusesIcon}
            className='filterIcon icon'
            alt='statuses icon'
          />
          <span>Statuses</span>
        </div>
        <div className='otherContainer '>
          <div className='iconContainer'>
            <img
              src={filterIcon}
              className='filterIcon icon'
              alt='filter icon'
            />
            <span className='filterText'>Filter</span>
          </div>
          <div className='iconContainer'>
            <img src={sortIcon} className='sortIcon icon' alt='sort icon' />
            <span className='sortText'>Sort</span>
          </div>
          <div className='iconContainer'>
            <img
              src={searchIcon}
              className='searchIcon icon'
              alt='search icon'
            />
            <span className='searchText'>Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
