import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <Head>
        <link rel="shortcut icon" href="/icon-256x256.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head> */}

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
