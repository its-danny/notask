"use client";

import { Box, Grid } from "@radix-ui/themes";
import NotesCard from "../notes/card";
import TasksCard from "../tasks/card";
import { useAtom } from "jotai";
import { tasksAtom } from "@/atoms/tasks";

export default function Content() {
  const [tasks] = useAtom(tasksAtom);

  return (
    <Grid columns="5" gap="8" width="auto" style={{ flex: 1 }} mb="8">
      <Box gridColumn={tasks.length > 0 ? "span 2" : "span 8"}>
        <NotesCard />
      </Box>

      {tasks.length > 0 && (
        <Box gridColumn="span 3">
          <TasksCard />
        </Box>
      )}
    </Grid>
  );
}
