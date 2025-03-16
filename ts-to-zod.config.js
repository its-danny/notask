/** @type {import("ts-to-zod").Config[]} */
module.exports = [
  {
    name: "task",
    input: "src/atoms/tasks.ts",
    output: "src/schemas/task.ts",
  },
];
