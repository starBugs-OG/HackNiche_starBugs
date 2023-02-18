import "@/styles/globals.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});
export default function App({ Component, pageProps }) {
  const { asPath } = useRouter();

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      withNormalizeCSS
      emotionCache={myCache}
      theme={{
        colorScheme: "light",
      }}
    >
      {asPath != "/login" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}
