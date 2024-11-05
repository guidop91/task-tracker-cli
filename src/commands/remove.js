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
  const taskIndex = list.findIndex(task => task.id === Number(id));
  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }

  list.splice(taskIndex, 1);
  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Task with id ${id} successfully removed`);
  console.timeEnd(REMOVE_STRING);
}

export { remove };