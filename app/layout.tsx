import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Savanna Grill | Taste the Spirit of Africa",
    template: "%s | Savanna Grill",
  },

  description:
    "Savanna Grill is a modern African restaurant celebrating bold Kenyan flavours, fresh ingredients, authentic cuisine and warm hospitality.",

  keywords: [
    "Savanna Grill",
    "African Restaurant",
    "Kenyan Restaurant",
    "Nyahururu Restaurant",
    "Nyama Choma",
    "Kenyan Food",
    "African Cuisine",
    "Restaurant Kenya",
    "Kenyan Cuisine",
    "Grilled Meat",
    "African Food",
    "Restaurant",
  ],

  authors: [{ name: "Savanna Grill" }],
  creator: "Savanna Grill",
  publisher: "Savanna Grill",
  applicationName: "Savanna Grill",
  category: "restaurant",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Savanna Grill | Taste the Spirit of Africa",
    description:
      "Bold African flavours, modern hospitality and memorable moments around the table.",
    type: "website",
    locale: "en_KE",
    siteName: "Savanna Grill",
    images: [
      {
        url: "/images/logo.png",
        width: 490,
        height: 414,
        alt: "Savanna Grill logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Savanna Grill | Taste the Spirit of Africa",
    description:
      "Bold African flavours, modern hospitality and memorable moments around the table.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
