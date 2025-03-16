"use client";

import { Box, Button, Card, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import {
  FileTextIcon,
  MagicWandIcon,
  UpdateIcon,
  UploadIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import Paste from "./paste";
import Upload from "./upload";
import { useAtom } from "jotai";
import { activeTabAtom, processNotesAtom } from "@/atoms/notes";

export default function NotesCard() {
  const [{ isProcessing }, processNotes] = useAtom(processNotesAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <Card>
      <Flex direction="column" gap="2" mb="2">
        <Flex align="center" gap="2">
          <FileTextIcon />
          <Heading size="3">Notes</Heading>
        </Flex>

        <Text color="gray" size="2">
          Paste your notes or upload a file — I&apos;ll handle the rest.
        </Text>
      </Flex>

      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "paste" | "upload")}
      >
        <Tabs.List>
          <Tabs.Trigger value="paste">
            <Flex align="center" gap="2">
              <UpdateIcon /> Paste Notes
            </Flex>
          </Tabs.Trigger>

          <Tabs.Trigger value="upload">
            <Flex align="center" gap="2">
              <UploadIcon /> Upload File
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>

        <Box pt="2">
          <Tabs.Content value="paste">
            <Paste />
          </Tabs.Content>

          <Tabs.Content value="upload">
            <Upload />
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      <Flex justify="center" mt="2">
        <Button
          disabled={isProcessing}
          onClick={() => processNotes()}
          style={{ width: "100%" }}
        >
          <Flex
            align="center"
            gap="2"
            justify="center"
            style={{ width: "100%" }}
          >
            {isProcessing ? (
              <>
                <ReloadIcon />
                Extracting...
              </>
            ) : (
              <>
                <MagicWandIcon />
                Extract
              </>
            )}
          </Flex>
        </Button>
      </Flex>
    </Card>
  );
}
