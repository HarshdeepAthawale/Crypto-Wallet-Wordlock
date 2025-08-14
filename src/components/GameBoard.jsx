import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import DragWord from './DragWord';

// Droppable component for the answer container
function DroppableAnswerContainer({ children, isOver }) {
  const { setNodeRef } = useDroppable({
    id: 'answer-container',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`min-h-[80px] p-4 rounded-md mb-6 border-2 border-dashed flex flex-wrap gap-4 items-center justify-center transition-colors ${
        isOver 
          ? 'bg-gray-700 border-green-400' 
          : 'bg-gray-900 border-gray-600'
      }`}
    >
      {children}
    </div>
  );
}

export default function GameBoard({ words, onSubmit, result }) {
  const [wordItems, setWordItems] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  const [animationClass, setAnimationClass] = useState('animate-pop-in');
  const [activeId, setActiveId] = useState(null);
  const [isOverAnswer, setIsOverAnswer] = useState(false);

  useEffect(() => {
    setWordItems(words.map((word, index) => ({ id: `word-${index}`, word })));
    setPlayerAnswer([]);
  }, [words]);

  useEffect(() => {
    if (result === 'incorrect') {
      setAnimationClass('animate-shake');
    }
  }, [result]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event) {
    console.log('Drag started:', event.active.id);
    setActiveId(event.active.id);
  }

  function handleDragOver(event) {
    const { over } = event;
    if (over) {
      setIsOverAnswer(over.id === 'answer-container');
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log('Drag ended:', { active: active?.id, over: over?.id });
    setActiveId(null);
    setIsOverAnswer(false);
    
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;

    // Check if we're dropping into the answer container
    const isOverAnswerContainer = overId === 'answer-container';
    const isActiveInAnswer = playerAnswer.some(item => item.id === activeId);
    const isOverInAnswer = isOverAnswerContainer || playerAnswer.some(item => item.id === overId);

    console.log('Drop analysis:', { isOverAnswerContainer, isActiveInAnswer, isOverInAnswer });

    // Moving from word pool to answer container
    if (!isActiveInAnswer && isOverAnswerContainer) {
      const itemToMove = wordItems.find(item => item.id === activeId);
      if (itemToMove) {
        console.log('Moving to answer:', itemToMove.word);
        setWordItems(items => items.filter(item => item.id !== activeId));
        setPlayerAnswer(items => [...items, itemToMove]);
      }
    }
    // Moving from answer container back to word pool
    else if (isActiveInAnswer && !isOverAnswerContainer) {
      const itemToMove = playerAnswer.find(item => item.id === activeId);
      if (itemToMove) {
        console.log('Moving back to pool:', itemToMove.word);
        setPlayerAnswer(items => items.filter(item => item.id !== activeId));
        setWordItems(items => [...items, itemToMove]);
      }
    }
    // Reordering within the answer container
    else if (isActiveInAnswer && isOverInAnswer) {
      setPlayerAnswer(items => {
        const oldIndex = items.findIndex(item => item.id === activeId);
        const newIndex = items.findIndex(item => item.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleSubmit = () => {
    const finalAnswer = playerAnswer.map(item => item.word);
    onSubmit(finalAnswer);
  };

  const activeItem = activeId ? [...wordItems, ...playerAnswer].find(item => item.id === activeId) : null;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={`w-full max-w-3xl text-center ${animationClass}`}>
        <DroppableAnswerContainer isOver={isOverAnswer}>
          <SortableContext items={playerAnswer} strategy={horizontalListSortingStrategy}>
            {playerAnswer.length > 0 ? (
              playerAnswer.map(item => <DragWord key={item.id} id={item.id} word={item.word} />)
            ) : (
              <p className="text-gray-500 italic">Drag words here to form the phrase</p>
            )}
          </SortableContext>
        </DroppableAnswerContainer>
        <div className="bg-gray-800 min-h-[80px] p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center justify-center">
          <SortableContext items={wordItems} strategy={horizontalListSortingStrategy}>
            {wordItems.map(item => <DragWord key={item.id} id={item.id} word={item.word} />)}
          </SortableContext>
        </div>
        <button 
          onClick={handleSubmit} 
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-500" 
          disabled={playerAnswer.length === 0}
        >
          Submit ({playerAnswer.length} words)
        </button>
      </div>
      <DragOverlay>
        {activeItem ? <DragWord id={activeItem.id} word={activeItem.word} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
