import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Link href = "/" className = "btn btn-primary mt-3">Back to Home</Link>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
