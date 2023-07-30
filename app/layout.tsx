import Header from "@/components/Header";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import Modal from "@/components/Modal";
import AuthProvider from "@/providers/AuthProvider";
import { APIiProvider } from "@/redux/ApiProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <Modal />
            <Header />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
