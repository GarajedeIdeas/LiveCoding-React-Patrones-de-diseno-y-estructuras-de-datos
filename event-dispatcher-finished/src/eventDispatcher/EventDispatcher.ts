import { Events, EventType } from "./types";

export type Listener<TEventType extends EventType> = (
  event: Events[TEventType]
) => void;

type ListenersMap = {
  [TEventType in EventType]?: Listener<TEventType>[];
};

export class EventDispatcher {
  private listenersMap: ListenersMap = {};

  subscribe<TEventType extends EventType>(
    eventType: TEventType,
    listener: Listener<TEventType>
  ): () => void {
    const listenersOfEvent = this.listenersMap[eventType];
    if (!listenersOfEvent) {
      this.listenersMap = {
        ...this.listenersMap,
        [eventType]: [listener]
      };
    } else {
      this.listenersMap = {
        ...this.listenersMap,
        [eventType]: [...listenersOfEvent, listener]
      };
    }

    return () => {
      this.listenersMap = {
        ...this.listenersMap,
        [eventType]: this.listenersMap[eventType]?.filter((l) => l !== listener)
      };
    };
  }

  dispatch<TEventType extends EventType>(
    type: TEventType,
    event: Events[TEventType]
  ): void {
    const listenersOfEvent = this.listenersMap[type];
    listenersOfEvent?.forEach((listener) => listener(event));
  }
}

export default EventDispatcher;
