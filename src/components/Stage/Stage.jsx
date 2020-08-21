import React from 'react';
import { ToggleLayer } from 'react-laag';
import Card from '../Card/Card';
import { Draggable } from 'react-beautiful-dnd';
import './Stage.css';
import ellipsis from '../../assets/ellipsis.svg';
import mark from '../../assets/mark.svg';
import star from '../../assets/star.svg';

function Stage(props) {
  const {
    title,
    count,
    cardData,
    className,
    selectedIds,
    cardOnclick,
    id,
  } = props;

  return (
    <div className='stage'>
      <div className='stageHeader'>
        <div className='stageInnerHeader'>
          <span className={`${className} stageCount`}>{count}</span>
          <h3 className='stageTitle'>{title}</h3>
        </div>
        <div>
          {id === 'pendingApproval' ? (
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
                  className="ellipsis iconContainer"
                  ref={triggerRef}
                  onClick={() => {
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
      </div>
      <div className='cardsGroup'>
        {cardData
          ? cardData.map((card, index) => {
              return (
                <Draggable
                  key={card.id}
                  draggableId={String(card.id)}
                  index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <Card
                        onClick={() => cardOnclick(card.id, id)}
                        key={index}
                        id={card.id}
                        snapshot={snapshot}
                        selectedIds={selectedIds}
                        title={card.title}
                        dueDate={card.dueDate}
                        description={card.description}
                        tag={card.tag}
                        assignee={card.assignee}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })
          : ''}
      </div>
    </div>
  );
}

export default Stage;
