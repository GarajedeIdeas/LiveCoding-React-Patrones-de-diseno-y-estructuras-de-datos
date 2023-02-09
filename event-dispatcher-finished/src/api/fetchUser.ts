import User from "../interfaces/User";

const user: User = {
  id: "1",
  name: "Jaya Rodgers",
  email: "jayarodgers@mail.com",
  tasksCount: 3
};

let queryTimeMin = 1000;
let queryTimeMax = 2000;

export default function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
