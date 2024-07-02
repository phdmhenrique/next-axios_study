// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import withAuth from "@/components/withAuth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps, router }: AppProps) {
  const isLoginPage = router.pathname === "/login";
  const ProtectedComponent = isLoginPage ? Component : withAuth(Component);
  const showComponents =
    router.pathname !== "/login" && router.pathname !== "/register";

  return (
    <AuthProvider>
      <main className={inter.className}>
        {showComponents && <Navbar />}
        <ProtectedComponent {...pageProps} />
        <Footer />
      </main>
    </AuthProvider>
  );
}
