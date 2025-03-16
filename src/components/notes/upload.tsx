import { uploadedFileAtom } from "@/atoms/notes";
import { UploadIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Badge, Box, Button, Flex, Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5MB in bytes
const ACCEPTED_FILE_TYPES = ".txt,.md,.rtf";

const FileIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const MarkdownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h2l2 2 2-2h2" />
  </svg>
);

const RichTextIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M10 13h4" />
    <path d="M10 17h8" />
    <path d="M10 9h4" />
  </svg>
);

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploadedFile) return;

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploadedFile) return;

    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files?.[0]) {
      const file = files[0];

      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum size is 1.5MB.");

        return;
      }

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const acceptedExtensions = ACCEPTED_FILE_TYPES.split(",").map((type) =>
        type.replace(".", "").toLowerCase(),
      );

      if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
        alert(`Invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES}`);

        return;
      }

      setUploadedFile(file);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  if (uploadedFile) {
    return (
      <Box p="6">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <FileIcon />

            <Text size="2" weight="bold" style={{ flex: 1 }}>
              {uploadedFile.name}
            </Text>

            <Button variant="soft" color="red" onClick={handleRemove}>
              <Cross2Icon />
              Remove
            </Button>
          </Flex>

          <Text size="1" color="gray">
            {(uploadedFile.size / 1024).toFixed(1)} KB
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      p="6"
      style={{
        border: `2px dashed var(--gray-6)`,
        borderRadius: "var(--radius-4)",
        backgroundColor: dragActive ? "var(--accent-3)" : "var(--gray-1)",
        transition: "background-color 0.2s ease",
      }}
    >
      <Flex direction="column" align="center" gap="4">
        <UploadIcon width="48" height="48" color="gray" />

        <Flex direction="column" align="center" gap="1">
          <Text size="2" weight="bold">
            Drop your file here, or
          </Text>

          <Button
            variant="outline"
            my="4"
            onClick={() => inputRef.current?.click()}
          >
            Browse files
          </Button>

          <Text size="1" color="gray">
            Maximum file size: 1.5MB
          </Text>

          <Flex gap="2" mt="2">
            <Badge color="gray" variant="soft" size="1">
              <Flex gap="1" align="center">
                <FileIcon />
                <Text size="1">Text</Text>
              </Flex>
            </Badge>

            <Badge color="gray" variant="soft" size="1">
              <Flex gap="1" align="center">
                <MarkdownIcon />
                <Text size="1">Markdown</Text>
              </Flex>
            </Badge>

            <Badge color="gray" variant="soft" size="1">
              <Flex gap="1" align="center">
                <RichTextIcon />
                <Text size="1">Rich Text</Text>
              </Flex>
            </Badge>
          </Flex>
        </Flex>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Flex>
    </Box>
  );
}
