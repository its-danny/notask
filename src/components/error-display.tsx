"use client";

import { clearErrorAtom, errorAtom } from "@/atoms/error";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect } from "react";

const AUTO_DISMISS_DELAY = 5000; // 5 seconds

export default function ErrorDisplay() {
  const [error] = useAtom(errorAtom);
  const [, clearError] = useAtom(clearErrorAtom);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, AUTO_DISMISS_DELAY);

      return () => clearTimeout(timer);
    }
  }, [error?.timestamp, clearError, error]);

  if (!error) return null;

  return (
    <Box
      position="fixed"
      style={{
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        animation: "slideUp 0.2s ease-out",
      }}
    >
      <Card
        size="2"
        variant="surface"
        style={{ backgroundColor: "var(--red-3)" }}
      >
        <Flex gap="3" align="center">
          <ExclamationTriangleIcon
            width={20}
            height={20}
            color="var(--red-9)"
          />
          <Text size="2" color="red" style={{ margin: 0 }}>
            {error.message}
          </Text>
          <Button
            variant="soft"
            color="red"
            onClick={() => clearError()}
            style={{ marginLeft: "1rem" }}
          >
            Dismiss
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
