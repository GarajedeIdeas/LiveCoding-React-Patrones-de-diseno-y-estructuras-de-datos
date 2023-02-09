import Label from "../interfaces/Label";

const labels: Label[] = [
  {
    id: "1",
    title: "Label 1",
    tasksCount: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  },
  {
    id: "2",
    title: "Label 2",
    tasksCount: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  },
  {
    id: "3",
    title: "Label 3",
    tasksCount: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia massa et leo accumsan, at luctus diam pulvinar."
  }
];

let queryTimeMin = 1000;
let queryTimeMax = 2000;

export default function fetchLabels(): Promise<Label[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labels);
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
