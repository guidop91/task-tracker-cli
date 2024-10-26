# Description

Task tracker CLI, built only with native Node packages.

## Install locally

The project uses the latest version of node (at the time of this development, v23). You can use [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to install it and use it:

```bash
nvm install
```

Clone the project to your machine, and `cd` into the directory.

Run the following command to make the `task-cli` alias available:

```bash
npm link
```

The list of commands and their usage is given below:

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Task Properties

Each task should have the following properties:

- id: A unique identifier for the task
- description: A short description of the task
- status: The status of the task (todo, in-progress, done)
- createdAt: The date and time when the task was created
- updatedAt: The date and time when the task was last updated

## Disclaimer

This is a practice project that is suggested as a beginner project in roadmap.sh. 

[Task Tracker](https://roadmap.sh/projects/task-tracker)

