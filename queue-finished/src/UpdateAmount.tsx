import { useState } from "react";
import updateAmount, { initialAmount } from "./api/updateAmount";
import Queue from "./queue";

async function worker(
  amount: number,
  done: (result: Awaited<ReturnType<typeof updateAmount>>) => void
) {
  const result = await updateAmount(amount);
  done(result);
}

const updateAmountQueued = Queue(worker);

export default function UpdateAmount() {
  const [amount, setAmount] = useState(initialAmount);

  async function handleClick() {
    setAmount(amount * 3);
    updateAmountQueued(amount * 3, function (result) {
      console.log(result);
      setAmount(result);
    });
  }

  return (
    <div>
      <p>Cantidad: {amount}</p>
      <button onClick={handleClick}>Triplicar</button>
    </div>
  );
}
