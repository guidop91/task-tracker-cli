import { add } from "../src/commands/index.js";
import { getOrCreateList, FILE_LOCATION } from "../src/helpers.js";

function main() {
  const [,, taskAmount] = process.argv;
  const taskList = getOrCreateList();
  const tasksObject = {
    list: taskList,
    fileLocation: FILE_LOCATION
  };

  for (let i = 0; i < Number(taskAmount); i++) {
    add(tasksObject, "Test description");
  }

  console.info(`Successfully added ${taskAmount} tasks.`)
}

main();
