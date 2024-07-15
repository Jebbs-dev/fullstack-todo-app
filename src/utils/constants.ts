import { TaskType, UserType } from "../../types";

export const users: UserType[] = [
  {
    id: 1,
    name: "Jack Smith",
    email: "jacksmith@gmail.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Josh Green",
    email: "jgreen@gmail.com",
    password: "password123",
  },
  {
    id: 3,
    name: "Sam Ricks",
    email: "samricks@gmail.com",
    password: "password123",
  },
  {
    id: 4,
    name: "Phoebe Chan",
    email: "phechan@gmail.com",
    password: "password123",
  },
  {
    id: 5,
    name: "Rose Vera",
    email: "rosevera@gmail.com",
    password: "password123",
  },
];
export const tasks: TaskType[] = [
  { id: 1, title: "Task 1", description: "Description 1", status: "completed" },
  { id: 2, title: "Task 2", description: "Description 2", status: "pending" },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    status: "in progress",
  },
];
