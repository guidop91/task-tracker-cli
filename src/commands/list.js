function list(tasksObject, state = '') {
  const LIST_STRING = 'List';
  console.time(LIST_STRING);
  const { list } = tasksObject;
  if (state === '') {
    console.log('Listing all tasks\n');
    ['new', 'in progress', 'done'].forEach(status => console.log(`${status.toUpperCase()}\n`, list[status]));
  } else {
    console.log(`${state.toUpperCase()}\n`, list[state])
  }
  console.timeEnd(LIST_STRING);
}

export { list };