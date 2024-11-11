import fs from 'node:fs';

/**
 * Mark task as in progress or done
 * 
 * @param {Array<object>} tasksObject - list of tasks available
 * @param {string} id - identifier of task
 * @param {string} newState - state to assign to task
 * @returns {undefined}
 */
function markAs(tasksObject, id, newState) {
  const MARK_AS_STRING = 'Mark as';
  console.time(MARK_AS_STRING);
  const { fileLocation, list } = tasksObject;

  const taskToEdit = list['new'][id] || list['in progress'][id] || list['done'][id];
  if (!taskToEdit) {
    throw new Error(`Task with id ${id} was not found`);
  }
  const { status } = taskToEdit;
  if (status === newState) {
    console.info('Task already has this status, not modifying');
    return;
  }

  taskToEdit.status = newState;
  taskToEdit.updatedAt = new Date();
  
  delete list[status][id];
  list[newState][id] = taskToEdit;

  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Marked task ${id} as ${newState}`);
  console.timeEnd(MARK_AS_STRING);
}

export { markAs };
