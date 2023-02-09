import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import EventDispatcher from "./EventDispatcher";
import Label from "../interfaces/Label";
import User from "../interfaces/User";

const eventDispatcher = new EventDispatcher();

const EventDispatcherContext = createContext<EventDispatcher>(eventDispatcher);

export function useEventDispatcher() {
  return useContext(EventDispatcherContext);
}

export function EventDispatcherContextProvider({ children }) {
  const queryClient = useQueryClient();

  useEffect(
    function () {
      eventDispatcher.subscribe("userClicked", function (event) {
        console.log(event.user);
      });
      eventDispatcher.subscribe("taskCreated", function (event) {
        const { task } = event;
        queryClient.invalidateQueries(["tasks"]);
        queryClient.setQueryData<User>(["users", "1"], function (oldUser) {
          if (!oldUser) {
            return oldUser;
          }
          return {
            ...oldUser,
            tasksCount: oldUser.tasksCount + 1
          };
        });
        queryClient.setQueryData<User>(["user", "1"], function (oldUser) {
          if (!oldUser) {
            return oldUser;
          }
          return {
            ...oldUser,
            tasksCount: oldUser.tasksCount + 1
          };
        });
        queryClient.setQueryData<Label[]>(["labels"], function (oldLabels) {
          if (!oldLabels) {
            return oldLabels;
          }
          return oldLabels.map((l) =>
            task.labels.includes(l.id)
              ? {
                  ...l,
                  tasksCount: l.tasksCount + 1
                }
              : l
          );
        });
      });
    },
    [queryClient]
  );
  return (
    <EventDispatcherContext.Provider value={eventDispatcher}>
      {children}
    </EventDispatcherContext.Provider>
  );
}
