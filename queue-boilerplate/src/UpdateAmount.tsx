import { useState } from "react";
import updateAmount, { initialAmount } from "./api/updateAmount";

export default function UpdateAmount() {
  const [amount, setAmount] = useState(initialAmount);

  async function handleClick() {
    const newAmount = amount * 3;
    setAmount(newAmount);
    const result = await updateAmount(newAmount);
    setAmount(result);
  }

  return (
    <div>
      <p>Cantidad: {amount}</p>
      <button onClick={handleClick}>Triplicar</button>
    </div>
  );
}
