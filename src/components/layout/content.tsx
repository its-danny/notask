"use client";

import { Box, Grid } from "@radix-ui/themes";
import NotesCard from "../notes/card";
import TasksCard from "../tasks/card";
import { useAtom } from "jotai";
import { tasksAtom } from "@/atoms/tasks";
import MessageBox from "../tasks/message-box";

export default function Content() {
  const [tasks] = useAtom(tasksAtom);

  return (
    <Grid columns="5" gap="8" width="auto" style={{ flex: 1 }} mb="8">
      <Box gridColumn="span 2">
        <NotesCard />
      </Box>

      <Box gridColumn="span 3">
        {tasks.length > 0 ? <TasksCard /> : <MessageBox />}
      </Box>
    </Grid>
  );
}
