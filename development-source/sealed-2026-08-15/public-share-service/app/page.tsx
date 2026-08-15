import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Network",
  description: "Opening Easy Network.",
};

export default function Home() {
  return (
    <main>
      <script
        dangerouslySetInnerHTML={{
          __html:
            'window.location.replace("https://wenronghan.github.io/Easy-Network/" + window.location.hash);',
        }}
      />
      <a href="https://wenronghan.github.io/Easy-Network/">Open Easy Network</a>
    </main>
  );
}
