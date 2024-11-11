import fs from 'node:fs';

/**
 * Delete a task specified by its identifier
 * 
 * @param {Array<object>} tasksObject - Object with tasks and file location
 * @param {string} id - Identifier of task to delete
 */
function remove(tasksObject, id) {
  const REMOVE_STRING = 'Remove';
  console.time(REMOVE_STRING);
  const { fileLocation, list } = tasksObject;

  // Get index of task to delete
  const taskToRemove = list['new'][id] || list['in progress'][id] || list['done'][id];
  if (!taskToRemove) {
    throw new Error(`Task with id ${id} was not found`);
  }

  const { status } = taskToRemove
  delete list[status][id];
  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Task with id ${id} successfully removed`);
  console.timeEnd(REMOVE_STRING);
}

export { remove };