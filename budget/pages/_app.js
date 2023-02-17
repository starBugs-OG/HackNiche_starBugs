import "@/styles/globals.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import Layout from "@/components/Layout";
const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});
export default function App({ Component, pageProps }) {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
