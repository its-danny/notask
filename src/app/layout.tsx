import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorDisplay from "@/components/error-display";
import SuccessDisplay from "@/components/success-display";
import { Provider } from "jotai";
import "../utils/error";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <Provider>
          <Theme>
            {children}

            <ErrorDisplay />
            <SuccessDisplay />
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
