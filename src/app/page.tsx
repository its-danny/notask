import "@radix-ui/themes/styles.css";

import { Box, Container, Heading, Text, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import TopBar from "@/components/layout/top-bar";
import Content from "@/components/layout/content";

export const metadata: Metadata = {
  title: "Notes → Tasks = Notask",
  description: "Turn your messy notes into actionable tasks in seconds.",
};

export default function Page() {
  return (
    <ClerkProvider>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <Container size="4" minHeight="100vh">
          <Flex direction="column" minHeight="100vh">
            <TopBar />

            <Box my="8">
              <Heading size="5">Notes &rarr; Tasks</Heading>

              <Text color="gray" mt="1">
                It&apos;s no task! Turn your messy notes into actionable tasks
                in seconds.
              </Text>
            </Box>

            <Content />
          </Flex>
        </Container>
      </SignedIn>
    </ClerkProvider>
  );
}
