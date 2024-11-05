function list(tasksObject, state = '') {
  const LIST_STRING = 'List';
  console.time(LIST_STRING);
  const { list } = tasksObject;
  if (state === '') {
    console.log('Listing all tasks\n');
    list.forEach(element => {
      console.log(element);
    });
  } else {
    const filteredList = list.filter(task => task.status === state);
    if (filteredList.length === 0) {
      console.error(`There are no tasks with a status of "${state}"`);
      return;
    }
    filteredList.forEach(element => {
      console.log(element);
    });
  }
  console.timeEnd(LIST_STRING);
}

export { list };