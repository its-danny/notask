import { Task, Priority } from "@/atoms/tasks";
import { ArrowLeftIcon, BarChartIcon, PlusIcon } from "@radix-ui/react-icons";
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

interface TeamMetadata {
  id: string;
  name: string;
  members: { id: string; name: string }[];
  labels: { id: string; name: string }[];
}

interface Metadata {
  teams: TeamMetadata[];
  organizationLabels: { id: string; name: string }[];
}

interface EditTaskProps {
  task: Task;
  metadata: Metadata;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export default function EditTask({
  task,
  metadata,
  onSave,
  onCancel,
}: EditTaskProps) {
  const [editedTask, setEditedTask] = useState(task);
  const currentTeam = metadata.teams.find((t) => t.id === editedTask.team.id);

  const handleTeamChange = (teamId: string) => {
    const newTeam = metadata.teams.find((t) => t.id === teamId)!;
    setEditedTask({
      ...editedTask,
      team: { id: newTeam.id, name: newTeam.name },
      // Clear assignee and tags when team changes as they might not be valid for new team
      assignee: null,
      tags: [],
    });
  };

  const handleAssigneeChange = (memberId: string) => {
    if (memberId === "unassigned") {
      setEditedTask({
        ...editedTask,
        assignee: null,
      });
      return;
    }
    const member = currentTeam?.members.find((m) => m.id === memberId);
    setEditedTask({
      ...editedTask,
      assignee: member ? { id: member.id, name: member.name } : null,
    });
  };

  const handleAddTag = (tagId: string) => {
    const tag = [
      ...(currentTeam?.labels || []),
      ...metadata.organizationLabels,
    ].find((t) => t.id === tagId);
    if (tag && !editedTask.tags.some((t) => t.id === tag.id)) {
      setEditedTask({
        ...editedTask,
        tags: [...editedTask.tags, { id: tag.id, name: tag.name }],
      });
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setEditedTask({
      ...editedTask,
      tags: editedTask.tags.filter((t) => t.id !== tagId),
    });
  };

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
            <Select.Root
              value={editedTask.team.id}
              onValueChange={handleTeamChange}
            >
              <Select.Trigger placeholder="Select team" />
              <Select.Content>
                <Select.Group>
                  {metadata.teams.map((team) => (
                    <Select.Item key={team.id} value={team.id}>
                      {team.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
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
            <Select.Root
              value={editedTask.assignee?.id || "unassigned"}
              onValueChange={handleAssigneeChange}
            >
              <Select.Trigger placeholder="Select assignee" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="unassigned">Unassigned</Select.Item>
                  {currentTeam?.members.map((member) => (
                    <Select.Item key={member.id} value={member.id}>
                      {member.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
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
            <Flex gap="2" wrap="wrap">
              {editedTask.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  color="gray"
                  variant="outline"
                  onClick={() => handleRemoveTag(tag.id)}
                  style={{ cursor: "pointer" }}
                >
                  {tag.name} ×
                </Badge>
              ))}
              <Select.Root onValueChange={handleAddTag}>
                <Select.Trigger>
                  <Badge color="gray" variant="outline">
                    <PlusIcon /> Add Tag
                  </Badge>
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {[
                      ...(currentTeam?.labels || []),
                      ...metadata.organizationLabels,
                    ]
                      .filter(
                        (tag) => !editedTask.tags.some((t) => t.id === tag.id),
                      )
                      .map((tag) => (
                        <Select.Item key={tag.id} value={tag.id}>
                          {tag.name}
                        </Select.Item>
                      ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
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
