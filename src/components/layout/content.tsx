"use client";

import { Box } from "@radix-ui/themes";
import NotesCard from "../notes/card";
import TasksCard from "../tasks/card";
import { useAtom } from "jotai";
import { tasksAtom } from "@/atoms/tasks";

export default function Content() {
  const [tasks] = useAtom(tasksAtom);

  return <Box>{tasks.length > 0 ? <TasksCard /> : <NotesCard />}</Box>;
}
