import React from 'react';
import TaskBoard from './TaskBoard';
import tasks from '../tasks.json';

export default function TaskBoardDemo() {
  return <TaskBoard tasks={tasks} />;
}
