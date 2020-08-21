import React, { useState } from 'react';
import { ToggleLayer } from 'react-laag';
import _ from 'lodash';
import { filters, stageMockData } from '../../__mock_data/StageMockData';

import statusesIcon from '../../assets/statuses.svg';
import searchIcon from '../../assets/search.svg';
import sortIcon from '../../assets/sort.svg';
import filterIcon from '../../assets/filter.svg';
import './ToolBar.css';

function ToolBar(props) {
  const { setNewBoard } = props;
  const [filterArray, setFilterArray] = useState([]);

  const setFilters = (e, currentFilter, setNewBoard) => {
    e.preventDefault();

    let finalFilters = [...filterArray];
    if (filterArray.includes(currentFilter.name)) {
      finalFilters = finalFilters.filter((ft) => ft !== currentFilter.name);
    } else {
      finalFilters.push(currentFilter.name);
    }
    setFilterArray([...finalFilters]);
    checkFilter(setNewBoard, finalFilters);
  };

  const checkFilter = (setNewBoard, finalFilters) => {
    let newBoard = _.cloneDeep(stageMockData);
    if (finalFilters.length) {
      newBoard.stages.forEach((stage) => {
        const newCardData = stage.cardData.filter((card) =>
          finalFilters.includes(card.tag)
        );
        stage.cardData = newCardData;
      });
      setNewBoard(newBoard);
    } else {
      setNewBoard(newBoard);
    }
  };

  const searchBoard = (value, setNewBoard) => {
    let newBoard = _.cloneDeep(stageMockData);
    if (value.length) {
      newBoard.stages.forEach((stage) => {
        const newCardData = stage.cardData.filter((card) =>
          card.title.includes(value)
        );
        stage.cardData = newCardData;
      });
      setNewBoard(newBoard);
    } else {
      setNewBoard(newBoard);
    }
  };

  return (
    <div className='board'>
      <div className='boardHeader'>
        <div className='statusesContainer  tools iconContainer'>
          <img
            src={statusesIcon}
            className='filterIcon icon'
            alt='statuses icon'
          />
          <span>Statuses</span>
        </div>
        <div className='otherContainer '>
          <ToggleLayer
            closeOnOutsideClick
            renderLayer={({ isOpen, layerProps }) =>
              isOpen && (
                <div
                  ref={layerProps.ref}
                  className='filterToolTip'
                  style={{
                    ...layerProps.style,
                  }}>
                  {filters.map((filter, index) => (
                    <div
                      key={index}
                      className='checkbox'
                      onClick={(event) => {
                        setFilters(event, filter, setNewBoard);
                      }}>
                      <input
                        checked={filterArray.includes(filter.name)}
                        onChange={() => {}}
                        type='checkbox'
                        id={`checkbox_${index}`}
                        name=''
                        value=''
                      />
                      <label htmlFor={`checkbox_${index}`}>
                        <span>{filter.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )
            }
            placement={{
              autoAdjust: true,
              anchor: 'BOTTOM_LEFT',
              triggerOffset: 5,
            }}>
            {({ triggerRef, toggle }) => (
              <div
                className='tools iconContainer'
                ref={triggerRef}
                onClick={() => {
                  toggle();
                }}>
                <img
                  src={filterIcon}
                  className='filterIcon icon'
                  alt='filter icon'
                />
                <span className='filterText'>Filter</span>
              </div>
            )}
          </ToggleLayer>
          <div className='tools iconContainer'>
            <img src={sortIcon} className='sortIcon icon' alt='sort icon' />
            <span className='sortText'>Sort</span>
          </div>
          <ToggleLayer
            closeOnOutsideClick
            renderLayer={({ isOpen, layerProps }) =>
              isOpen && (
                <div
                  ref={layerProps.ref}
                  className='searchToolTip'
                  style={{
                    ...layerProps.style,
                  }}>
                  <label htmlFor='search' className='searchLabel'>
                    <span>Search</span>
                  </label>
                  <input
                    type='search'
                    className='searchInput'
                    id='search'
                    onChange={(e) => searchBoard(e.target.value, setNewBoard)}
                  />
                </div>
              )
            }
            placement={{
              autoAdjust: true,
              anchor: 'BOTTOM_CENTER',
              triggerOffset: 5,
            }}>
            {({ triggerRef, toggle }) => (
              <div
                className='tools iconContainer'
                ref={triggerRef}
                onClick={() => {
                  toggle();
                }}>
                <img
                  src={searchIcon}
                  className='searchIcon icon'
                  alt='search icon'
                />
                <span className='searchText'>Search</span>
              </div>
            )}
          </ToggleLayer>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
