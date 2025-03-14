import { Theme } from "@radix-ui/themes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="ruby">{children}</Theme>
      </body>
    </html>
  );
}
