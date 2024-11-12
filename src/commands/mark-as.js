import fs from 'node:fs';

/**
 * Mark task as in progress or done
 * 
 * @param {Array<object>} tasksObject - list of tasks available
 * @param {string} id - identifier of task
 * @param {string} state - state to assign to task
 * @returns {undefined}
 */
function markAs(tasksObject, id, state) {
  const MARK_AS_STRING = 'Mark as';
  console.time(MARK_AS_STRING);
  const { fileLocation, list } = tasksObject;

  const taskToEdit = list.find(task => task.id === Number(id));
  if (!taskToEdit) {
    throw new Error(`Task with id ${id} was not found`);
  }

  const taskIndex = list.findIndex(task => task.id === Number(id));
  if (taskToEdit.status === state) {
    console.info('Status was not changed');
    return;
  }
  taskToEdit.status = state;
  taskToEdit.updatedAt = new Date();

  list.splice(taskIndex + 1, 1, taskToEdit);
  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Marked task ${id} as ${state}`);
  console.timeEnd(MARK_AS_STRING);
}

export { markAs };
