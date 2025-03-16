"use client";

import { clearSuccessAtom, successAtom } from "@/atoms/success";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import confetti from "canvas-confetti";
import { useAtom } from "jotai";
import { useEffect } from "react";

const AUTO_DISMISS_DELAY = 5000; // 5 seconds

export default function SuccessDisplay() {
  const [success] = useAtom(successAtom);
  const [, clearSuccess] = useAtom(clearSuccessAtom);

  useEffect(() => {
    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#63f5aa", "#63f5aa", "#63f5aa"],
      });

      const timer = setTimeout(() => {
        clearSuccess();
      }, AUTO_DISMISS_DELAY);

      return () => clearTimeout(timer);
    }
  }, [success?.timestamp, clearSuccess, success]);

  if (!success) return null;

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
        style={{ backgroundColor: "var(--jade-3)" }}
      >
        <Flex gap="3" align="center">
          <CheckCircledIcon width={20} height={20} color="var(--jade-9)" />
          <Text size="2" color="jade" style={{ margin: 0 }}>
            {success.message}
          </Text>
          <Button
            variant="soft"
            color="jade"
            onClick={() => clearSuccess()}
            style={{ marginLeft: "1rem" }}
          >
            Dismiss
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
