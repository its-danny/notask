import { Card, Flex, Heading, Button } from "@radix-ui/themes";
import { CheckboxIcon, DownloadIcon } from "@radix-ui/react-icons";
import ReadyTask from "./ready-task";
import EditTask from "./edit";
import { useAtom } from "jotai";
import {
  Task,
  removeTaskAtom,
  selectedTasksAtom,
  tasksAtom,
} from "@/atoms/tasks";
import { useState } from "react";
import { exportToLinear } from "@/actions/export-to-linear";
import ExportedTask from "./exported-task";

export default function TasksCard() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, removeTask] = useAtom(removeTaskAtom);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTasks] = useAtom(selectedTasksAtom);

  const handleSave = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
  };

  const handleExport = async () => {
    try {
      const exportedTasks = await exportToLinear(
        tasks.filter((task) => selectedTasks.includes(task)),
      );

      setTasks(exportedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ height: "100%" }}>
      <Flex direction="column" height="100%">
        {editingTask ? (
          <EditTask
            task={editingTask}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
          />
        ) : (
          <>
            <Flex align="center" gap="2" mb="4">
              <CheckboxIcon />
              <Heading size="3">Tasks</Heading>
            </Flex>

            <Flex
              direction="column"
              style={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
                position: "relative",
              }}
            >
              <Flex
                direction="column"
                style={{ paddingBottom: "var(--space-6)" }}
              >
                {tasks.map((task) =>
                  task.url ? (
                    <ExportedTask key={task.id} task={task} />
                  ) : (
                    <ReadyTask
                      key={task.id}
                      task={task}
                      onEdit={setEditingTask}
                      onDelete={removeTask}
                    />
                  ),
                )}
              </Flex>

              <Flex
                px="4"
                py="3"
                justify="center"
                style={{
                  position: "sticky",
                  bottom: 0,
                  borderTop: "1px solid var(--gray-5)",
                  marginTop: "auto",
                }}
              >
                <Button onClick={handleExport}>
                  <DownloadIcon />
                  Export
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  );
}
