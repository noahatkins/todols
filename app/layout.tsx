import "./globals.css";
import {ThemeProvider} from "./theme-provider";
import {switchThemeDuration} from "./constants/switch-theme-duration";

export const metadata = {
  title: "todols",
  description:
    "A minimalist to-do list web app built with Next.js, TypeScript, and styled using Tailwind CSS. Easily manage your tasks, with data stored locally for convenience.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/personal_blue.png" />
      <body className={`bg-gray-50 dark:bg-slate-900 ${switchThemeDuration}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
