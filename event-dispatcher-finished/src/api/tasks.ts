import Task from "../interfaces/Task";

let tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    labels: ["1"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  },
  {
    id: "2",
    title: "Task 2",
    labels: ["2"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  },
  {
    id: "3",
    title: "Task 3",
    labels: ["3"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  }
];

let queryTimeMin = 1000;
let queryTimeMax = 2000;

export function fetchTasks(labelId: string | null = null): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        labelId ? tasks.filter((t) => t.labels.includes(labelId)) : tasks
      );
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}

export function postTask(task: Task): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = [...tasks, task];
      resolve();
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
