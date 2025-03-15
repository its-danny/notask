import { Task } from "@/atoms/tasks";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";

interface TaskProps {
  task: Task;
}

export default function ExportedTask({ task }: TaskProps) {
  return (
    <Box py="2">
      <Flex gap="3" align="center">
        <Box
          style={{
            flex: 1,
            borderLeft: "4px solid var(--ruby-9)",
            paddingLeft: "12px",
          }}
        >
          <Flex justify="between" align="center">
            <Flex align="center" gap="2">
              <Text size="3" weight="bold">
                {task.title}
              </Text>
            </Flex>

            <IconButton
              size="1"
              variant="ghost"
              onClick={() => window.open(task.url, "_blank")}
            >
              <ExternalLinkIcon />
            </IconButton>
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
