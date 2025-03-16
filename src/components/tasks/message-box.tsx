import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { isProcessingAtom } from "@/atoms/notes";

export default function MessageBox() {
  const [isProcessing] = useAtom(isProcessingAtom);

  return (
    <Card style={{ height: "100%" }}>
      <Flex direction="column" height="100%">
        <Flex
          align="center"
          justify="center"
          style={{
            flex: 1,
            minHeight: 0,
          }}
        >
          <Box
            p="4"
            style={{
              backgroundColor: "var(--ruby-3)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Flex gap="2">
              <HeartFilledIcon style={{ color: "var(--ruby-9)" }} />

              <Text size="2" style={{ color: "var(--ruby-11)" }}>
                {isProcessing
                  ? "Asking Claude to find tasks in your notes..."
                  : "Ready to help you organize your tasks!"}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
