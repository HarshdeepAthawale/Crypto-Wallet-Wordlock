import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DragWord({ id, word }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none px-4 py-2 bg-gray-600 text-white font-bold rounded-md cursor-grab active:cursor-grabbing shadow-md hover:bg-gray-500 transition-all duration-200 hover:scale-105 hover:shadow-lg"
    >
      {word}
    </div>
  );
}
