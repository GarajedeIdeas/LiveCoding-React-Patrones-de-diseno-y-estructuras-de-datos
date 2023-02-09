export const initialAmount = 1;

let queryTimeMin = 2000;
let queryTimeMax = 4000;

export default function updateAmount(amount: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(amount);
    }, (queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin)) / amount);
  });
}
