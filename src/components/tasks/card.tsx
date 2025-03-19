import { Card, Flex, Button } from "@radix-ui/themes";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import ReadyTask from "./ready-task";
import EditTask from "./edit";
import { useAtom } from "jotai";
import {
  Task,
  removeTaskAtom,
  selectedTasksAtom,
  tasksAtom,
  metadataAtom,
} from "@/atoms/tasks";
import { useState } from "react";
import { exportToLinear } from "@/actions/export-to-linear";
import ExportedTask from "./exported-task";
import { setSuccessAtom } from "@/atoms/success";
import { resetNotesAtom } from "@/atoms/notes";

export default function TasksCard() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [metadata] = useAtom(metadataAtom);
  const [, removeTask] = useAtom(removeTaskAtom);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTasks] = useAtom(selectedTasksAtom);
  const [, setSuccess] = useAtom(setSuccessAtom);
  const [, resetNotes] = useAtom(resetNotesAtom);

  const handleSave = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
  };

  const handleExport = async () => {
    try {
      const selectedTasksList = tasks.filter((task) =>
        selectedTasks.includes(task),
      );
      const exportedTasks = await exportToLinear(selectedTasksList);

      setTasks(exportedTasks);
      setSuccess(
        `Successfully exported ${selectedTasksList.length} task${selectedTasksList.length === 1 ? "" : "s"} to Linear`,
      );
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
            metadata={metadata}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
          />
        ) : (
          <>
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
                py="3"
                justify="center"
                style={{
                  position: "sticky",
                  bottom: 0,
                  borderTop: "1px solid var(--gray-5)",
                  marginTop: "auto",
                  width: "100%",
                }}
              >
                <Flex gap="2">
                  <Button onClick={handleExport} style={{ flex: 1 }}>
                    <Flex
                      align="center"
                      gap="2"
                      justify="center"
                      style={{ width: "100%" }}
                    >
                      <DownloadIcon />
                      Export
                    </Flex>
                  </Button>
                  <Button onClick={resetNotes} variant="soft" color="gray">
                    <Flex align="center" gap="2">
                      <ReloadIcon />
                      Start Over
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  );
}
