// Imports
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Utils
import { AuthProvider } from "@/context/AuthContext";

// Components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

// Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </AuthProvider>
  );
}
