import fs from 'node:fs';

/**
 * Add a task to the list (create list if doesn't exist)
 * 
 * @param {Array<object>} - List of available tasks
 * @param {string} taskTitle - Title of the task to add
 */
function add(tasksObject, taskTitle) {
  const ADD_STRING = 'Remove';
  console.time(ADD_STRING);
  const { fileLocation, list } = tasksObject;
  const lastId = getLastId(list);
  const newTask = createNewTask(taskTitle, lastId + 1);

  list.push(newTask);
  fs.writeFileSync(fileLocation, JSON.stringify(list, null, 2));
  console.log('Added new task', newTask)
  console.timeEnd(ADD_STRING);
}

/**
 * Creates a new task from user input
 * 
 * @param {string} taskTitle - Title or description of the task
 * @param {number} id - identifier of the task
 * @returns {object} newly created task object
 */
function createNewTask(taskTitle, id) {
  return {
    id,
    description: taskTitle,
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * Get the id of the last task in the list
 * 
 * @param {Array<object>} taskList - list of tasks
 * @returns {number} Number of last id that was created
 */
function getLastId(taskList) {
  const listLength = taskList.length;
  if (listLength === 0) return 0

  return taskList[listLength - 1].id;
}

export { add };
