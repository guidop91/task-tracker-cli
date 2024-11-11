import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'node:fs';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIRECTORY_LOCATION = path.join(__dirname, '..', 'storage');
export const FILE_LOCATION = path.join(DIRECTORY_LOCATION, 'task-list.json');

/**
 * Get the task list from file, or create if doesn't exist
 * 
 * @returns {undefined}
 */
export function getOrCreateList() {
  let taskList;
  try {
    taskList = JSON.parse(fs.readFileSync(FILE_LOCATION));
  } catch (err) {
    if (err.code === 'ENOENT') {
      taskList = createFile(FILE_LOCATION)
    } else {
      console.error(err);
    }
  }

  return taskList;
}

/**
 * Create a file and return an empty array. This initializes a task list when it doesn't exist
 * 
 * @returns {Array} Empty array
 */
function createFile() {
  // Check if the directory exists
  if (!fs.existsSync(DIRECTORY_LOCATION)) {
    fs.mkdirSync(DIRECTORY_LOCATION, { recursive: true });
    console.log(`Directory not found, created: ${DIRECTORY_LOCATION}`);
  }

  const initialStructure = {
    new: {},
    "in progress": {},
    done: {},
  };
  fs.writeFileSync(FILE_LOCATION, JSON.stringify(initialStructure, null, 2));
  return [];
}