import React from 'react';
import cardTypeIcon from '../../assets/cardTypeIcon.svg';
import dateIcon from '../../assets/dateIcon.svg';
import './Card.css';

function Card(props) {
  const {
    title,
    description,
    tag,
    dueDate,
    assignee,
    selectedIds,
    id,
    onClick,
    snapshot,
  } = props;
  const selectionCount = selectedIds.length;
  const shouldShowSelection = snapshot.isDragging && selectionCount > 1;

  return (
    <div
      onClick={onClick}
      className={`Card ${
        selectedIds.includes(id) ? 'cardFocused' : 'cardUnFocused'
      }`}>
      <div className='cardHeader'>
        <h3 className='cardTitle'>{title}</h3>
        {shouldShowSelection ? (
          <span className='selectionCount'>{selectionCount}</span>
        ) : (
          ''
        )}
      </div>
      <p className='cardText'>{description}</p>
      <div className='iconContainer'>
        <img src={cardTypeIcon} className='icon' alt='card type icon' />
        <span className='cardText'>{tag}</span>
      </div>
      {dueDate ? <hr /> : ''}
      <div className='iconContainer bottomCard'>
        <div>
          <img src={dateIcon} className='icon' alt='date icon' />
          <span className='cardText'>{dueDate}</span>
        </div>
        {assignee ? (
          <div className='cardAssignee'>
            <span>{String(assignee).charAt(0).toUpperCase()}</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Card;
