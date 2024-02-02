import "@/styles/globals.css";
import { AuthProvider } from "./api/providers";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
