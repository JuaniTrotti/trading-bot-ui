import "./globals.css";

export const metadata = {
  title: "Bot Operations",
  description: "Trading bot decision operations dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
