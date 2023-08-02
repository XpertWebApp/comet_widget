import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/markdown-it@12.2.0/dist/markdown-it.min.js"
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
