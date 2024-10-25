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
  const { list, fileLocation } = taskObject;
  if (list.length === 0) {
    throw new Error('List has no tasks, cannot update');
  }

  const taskToUpdate = list.find(task => task.id === Number(id));
  if (!taskToUpdate) {
    throw new Error(`Task with id ${id} was not found`);
  }
  const taskIndex = list.findIndex(task => task.id === id);

  taskToUpdate.description = newTaskTitle;
  taskToUpdate.updatedAt = new Date();
  list.splice(taskIndex, 1, taskToUpdate);

  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log(`Updated task with id ${id} to "${newTaskTitle}"`);
}

export { update };
