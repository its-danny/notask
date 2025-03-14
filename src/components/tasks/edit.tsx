import { Task, Priority } from "@/atoms/tasks";
import { ArrowLeftIcon, BarChartIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

interface EditTaskProps {
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export default function EditTask({ task, onSave, onCancel }: EditTaskProps) {
  const [editedTask, setEditedTask] = useState(task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Box>
      <Flex align="center" gap="2" mb="4">
        <IconButton size="2" variant="ghost" onClick={onCancel}>
          <ArrowLeftIcon />
        </IconButton>
        <Text size="3" weight="bold">
          Edit Task
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Box>
            <Text
              as="label"
              size="2"
              weight="bold"
              mb="1"
              style={{ display: "block" }}
            >
              Team
            </Text>
            <Text size="2" mb="1">
              {editedTask.team.name}
            </Text>
          </Box>

          <Box>
            <Text as="label" size="2" weight="bold" mb="1">
              Title
            </Text>
            <TextField.Root
              value={editedTask.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
          </Box>

          <Box>
            <Text as="label" size="2" weight="bold" mb="1">
              Description
            </Text>
            <TextArea
              value={editedTask.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
          </Box>

          <Box>
            <Text
              as="label"
              size="2"
              weight="bold"
              mb="1"
              style={{ display: "block" }}
            >
              Assignee
            </Text>

            <Text size="2" mb="1">
              {editedTask.assignee?.name}
            </Text>
          </Box>

          <Box>
            <Text as="label" size="2" weight="bold" mb="1">
              Due Date
            </Text>
            <TextField.Root
              type="date"
              value={editedTask.due_date || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedTask({
                  ...editedTask,
                  due_date: e.target.value || null,
                })
              }
            />
          </Box>

          <Box>
            <Text
              as="label"
              size="2"
              weight="bold"
              mb="1"
              style={{ display: "block" }}
            >
              Priority
            </Text>
            <Select.Root
              value={`${editedTask.priority}`}
              onValueChange={(value) =>
                setEditedTask({
                  ...editedTask,
                  priority: parseInt(value) as Priority,
                })
              }
            >
              <Select.Trigger placeholder="Select priority" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="0">
                    <Flex gap="2" align="center">
                      No priority
                    </Flex>
                  </Select.Item>
                  <Select.Item value="1">
                    <Flex gap="2" align="center">
                      <BarChartIcon style={{ color: "var(--red-9)" }} />
                      Urgent
                    </Flex>
                  </Select.Item>
                  <Select.Item value="2">
                    <Flex gap="2" align="center">
                      <BarChartIcon style={{ color: "var(--yellow-9)" }} />
                      High
                    </Flex>
                  </Select.Item>
                  <Select.Item value="3">
                    <Flex gap="2" align="center">
                      <BarChartIcon style={{ color: "var(--green-9)" }} />
                      Normal
                    </Flex>
                  </Select.Item>
                  <Select.Item value="4">
                    <Flex gap="2" align="center">
                      <BarChartIcon style={{ color: "var(--gray-9)" }} />
                      Low
                    </Flex>
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text
              as="label"
              size="2"
              weight="bold"
              mb="1"
              style={{ display: "block" }}
            >
              Tags
            </Text>

            <Flex gap="2">
              {editedTask.tags.map((tag) => (
                <Badge key={tag.id} color="gray" variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          </Box>

          <Flex gap="3" mt="4">
            <Button type="submit">Save Changes</Button>
            <Button variant="soft" onClick={onCancel}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
