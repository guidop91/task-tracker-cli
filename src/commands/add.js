import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_LOCATION = path.join(__dirname, '..', '..', 'storage/task-list.json');

/**
 * Add a task to the list (create list if doesn't exist)
 * 
 * @param {string} taskTitle - TItle of the task to add
 */
function add(taskTitle) {
  const taskList = getOrCreateList();

  const lastId = getLastId(taskList);
  const newTask = createNewTask(taskTitle, lastId + 1);

  taskList.push(newTask);
  fs.writeFileSync(FILE_LOCATION, JSON.stringify(taskList, null, 2));
}

function getOrCreateList() {
  let file;
  try {
    file = fs.readFileSync(FILE_LOCATION);
  } catch (err) {
    if (err.code === 'ENOENT') {
      file = createFile()
    } else {
      console.error(err);
    }
  }

  return JSON.parse(file);
}

function createFile() {
  return fs.writeFileSync(FILE_LOCATION, JSON.stringify([], null, 2));
}

function createNewTask(taskTitle, id) {
 return {
  id,
  description: taskTitle,
  status: 'new',
  createdAt: new Date(),
  updatedAt: new Date()
 }
}

function getLastId(taskList) {
  const listLength = taskList.length;
  if (listLength === 0) return 0

  return taskList[listLength - 1].id;
}

export { add };