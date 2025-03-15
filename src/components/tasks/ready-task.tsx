import { Task, toggleTaskSelectionAtom } from "@/atoms/tasks";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Checkbox,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useAtom } from "jotai";

interface TaskProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function ReadyTask({ task, onEdit, onDelete }: TaskProps) {
  const [selectedTasks, toggleTaskSelection] = useAtom(toggleTaskSelectionAtom);
  console.log(task);

  const confidenceColor = {
    high: "green",
    medium: "yellow",
    low: "red",
  } as const;

  return (
    <Box py="2">
      <Flex gap="3" align="center">
        <Checkbox
          size="2"
          checked={selectedTasks.includes(task)}
          onCheckedChange={() => toggleTaskSelection(task)}
        />

        <Box style={{ flex: 1 }}>
          <Flex justify="between" align="center">
            <Flex align="center" gap="2">
              <Tooltip content={`Confidence: ${task.confidence}`}>
                <Box
                  width="8px"
                  height="8px"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: `var(--${
                      confidenceColor[task.confidence]
                    }-9)`,
                  }}
                />
              </Tooltip>

              <Text size="3" weight="bold">
                {task.title}
              </Text>
            </Flex>

            <Flex gap="2" align="center">
              <IconButton size="1" variant="ghost" onClick={() => onEdit(task)}>
                <Pencil1Icon />
              </IconButton>

              <IconButton
                size="1"
                variant="ghost"
                color="red"
                onClick={() => onDelete(task.id)}
              >
                <TrashIcon />
              </IconButton>
            </Flex>
          </Flex>

          {task.description && (
            <Text
              color="gray"
              size="2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {task.description}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
