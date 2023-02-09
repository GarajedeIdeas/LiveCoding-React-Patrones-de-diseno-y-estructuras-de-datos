export type Done<TResult> = (result: TResult) => void;
export type Worker<TData, TResult> = (item: TData, done: Done<TResult>) => void;
export type Callback<TResult> = (result: TResult) => void;
export type Item<TData, TResult> = {
  data: TData;
  callback: Callback<TResult>;
};

export default function Queue<TData, TResult>(worker: Worker<TData, TResult>) {
  let queueItems: Item<TData, TResult>[] = [];
  let isWorking = false;

  function runNext() {
    if (isWorking) {
      return;
    }
    if (queueItems.length === 0) {
      return;
    }

    const item = queueItems.shift();
    if (!item) {
      return;
    }

    isWorking = true;
    worker(item.data, function (result) {
      isWorking = false;
      runNext();
      setTimeout(() => item.callback(result), 0);
    });
  }

  return function (data: TData, callback: Callback<TResult>) {
    queueItems.push({
      data,
      callback
    });
    setTimeout(runNext, 0);
  };
}
