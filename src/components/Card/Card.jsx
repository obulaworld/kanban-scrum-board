import React from 'react';
import { ToggleLayer } from 'react-laag';
import cardTypeIcon from '../../assets/cardTypeIcon.svg';
import dateIcon from '../../assets/dateIcon.svg';
import ellipsis from '../../assets/ellipsis.svg';
import mark from '../../assets/mark.svg';
import star from '../../assets/star.svg';
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
    ellipsisBackground,
    setEllipsisBackground,
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
        {!shouldShowSelection && selectedIds.includes(id) ? (
          <ToggleLayer
            closeOnOutsideClick
            renderLayer={({ isOpen, layerProps }) =>
              isOpen && (
                <div
                  ref={layerProps.ref}
                  className='ellipsisToolTip'
                  style={{
                    ...layerProps.style,
                  }}>
                  <div className='approvalMenu firstListItem'>
                    {selectedIds.length} Items Selected
                  </div>
                  <hr />
                  <div className='approvalMenu'>
                    <img className='icon' src={mark} alt='mark icon' />
                    Approve
                  </div>
                  <hr />
                  <div className='approvalMenu'>
                    <img className='icon' src={star} alt='star icon' />
                    Rate
                  </div>
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
                className={`ellipsis iconContainer ${
                  ellipsisBackground ? 'ellipsisBackground' : ''
                }`}
                ref={triggerRef}
                onClick={() => {
                  setEllipsisBackground(!ellipsisBackground);
                  toggle();
                }}>
                <span className='ellipsisContainer'>
                  <img src={ellipsis} alt="ellipsis icon"/>
                </span>
              </div>
            )}
          </ToggleLayer>
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
