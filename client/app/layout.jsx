import "./globals.css";

export const metadata = {
  title: "Food Waste Tracker",
  description: "Track and manage daily food waste",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
