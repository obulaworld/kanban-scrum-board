import React from 'react';
import Card from '../Card/Card';
import { Draggable } from 'react-beautiful-dnd';
import './Stage.css';

function Stage(props) {
  const { title, count, cardData, className } = props;
  return (
    <div className='stage'>
      <div className='stageHeader'>
        <span className={`${className} stageCount`}>{count}</span>
        <h3 className='stageTitle'>{title}</h3>
      </div>
      <div className='cardsGroup'>
        {cardData
          ? cardData.map((card, index) => {
              return (
                <Draggable
                  key={card.id}
                  draggableId={String(card.id)}
                  index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <Card
                        key={index}
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
