import "@/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pokemon View",
  description: "pokemon layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
      <Footer />
    </html>
  );
}
