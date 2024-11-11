import fs from 'node:fs';

/**
 * 
 * @param {object} taskObject 
 * @param {Array<object>} taskObject.list - List of tasks
 * @param {string} taskObject.location - Location of file in storage
 * @param {string} id 
 * @param {string} newTaskTitle 
 */
function update(taskObject, id, newTaskTitle) {
  const UPDATE_STRING = 'Update';
  console.time(UPDATE_STRING);
  const { list, fileLocation } = taskObject;

  const taskToUpdate = list['new'][id] || list['in progress'][id] || list['done'][id];
  if (!taskToUpdate) {
    throw new Error(`Task with id ${id} was not found`);
  }
  const { status } = taskToUpdate;

  taskToUpdate.description = newTaskTitle;
  taskToUpdate.updatedAt = new Date();
  list[status][id] = taskToUpdate;

  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Updated task with id ${id} to "${newTaskTitle}"`);
  console.timeEnd(UPDATE_STRING);
}

export { update };
