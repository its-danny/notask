import { UserButton } from "@clerk/nextjs";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";

export default function TopBar() {
  return (
    <Box py="2">
      <Flex align="center" justify="between">
        <Flex align="center" gap="2">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="24" height="24" rx="6" ry="6" fill="#000" />
              <rect
                x="6"
                y="4"
                width="12"
                height="16"
                rx="2"
                ry="2"
                fill="#000"
                stroke="#fff"
              />
              <path stroke="#fff" d="M9 13h6m-6 3h3" />
              <path d="M9.5 8.5 11 10l3.5-3.5" stroke="#fff" strokeWidth="2" />
            </svg>
          </Box>

          <Text size="5" weight="bold">
            Notask
          </Text>

          <Badge color="amber" variant="soft" size="1">
            Beta
          </Badge>
        </Flex>

        <Flex align="center" gap="2">
          <UserButton />
        </Flex>
      </Flex>
    </Box>
  );
}
