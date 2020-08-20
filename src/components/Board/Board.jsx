import React, { useCallback, useState } from 'react';
import ToolBar from '../ToolBar/ToolBar';
import Stage from '../Stage/Stage';
import { stageMockData } from '../../__mock_data/StageMockData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { array_move, array_insert } from '../../utils/utils';
import './Board.css';

function Board() {
  const [board, setBoard] = useState(stageMockData);

  const onDragEnd = useCallback(
    (event) => {
      let newCardData;
      const { destination, source } = event;

      if (destination === null) {
        return;
      }

      if (destination.droppableId === source.droppableId) {
        const stage = board.stages.find(
          (stage) => stage.id === source.droppableId
        );
        const stageIndex = board.stages.findIndex(
          (stage) => stage.id === source.droppableId
        );
        newCardData = array_move(
          stage.cardData,
          source.index,
          destination.index
        );
        board.stages[stageIndex].cardData = newCardData;
        setBoard(board);
      } else {
        const sourceStage = board.stages.find(
          (stage) => stage.id === source.droppableId
        );
        const destinationStage = board.stages.find(
          (stage) => stage.id === destination.droppableId
        );

        const sourceStageIndex = board.stages.findIndex(
          (stage) => stage.id === source.droppableId
        );
        const destinationStageIndex = board.stages.findIndex(
          (stage) => stage.id === destination.droppableId
        );

        const toBeInserted = { ...sourceStage.cardData[source.index] };

        newCardData = array_insert(
          destinationStage.cardData,
          destination.index,
          toBeInserted
        );
        board.stages[destinationStageIndex].cardData = newCardData;

        board.stages[sourceStageIndex].cardData.splice(source.index, 1);

        setBoard(board);
      }
    },
    [board, setBoard]
  );

  return (
    <div className='Board'>
      <ToolBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='stageGroup'>
          {board.stages.map((stage, index) => {
            return (
              <Droppable droppableId={String(stage.id)} key={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Stage
                      key={index}
                      title={stage.title}
                      cardData={stage.cardData}
                      count={stage.cardData.length}
                      className={stage.className}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
