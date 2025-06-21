import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // custom variable
  display: 'swap',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})


export const metadata = {
  title: "Secrely",
  description: "Something Apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${space.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
