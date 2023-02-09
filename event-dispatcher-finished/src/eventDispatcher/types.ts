import Task from "../interfaces/Task";
import User from "../interfaces/User";

export const TaskCreatedName = "taskCreated";
export const UserClickedName = "userClicked";
export type EventType = "taskCreated" | "userClicked";

export interface IBaseEvent {
  type: EventType;
  timestamp: Date;
}

export interface TaskCreated extends IBaseEvent {
  task: Task;
  type: "taskCreated";
}

export interface UserClicked extends IBaseEvent {
  user: User;
  type: "userClicked";
}

export interface Events {
  [TaskCreatedName]: TaskCreated;
  [UserClickedName]: UserClicked;
}
