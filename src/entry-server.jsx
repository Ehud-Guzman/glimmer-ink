// Prerender/SSR entry, consumed by scripts/prerender.js after
// `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
//
// Content is rendered with renderToPipeableStream rather than renderToString so
// that Suspense + React.lazy() resolve properly: every route keeps its own
// client-side chunk, yet the prerendered HTML still holds the full page.
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

const collect = (element) =>
  new Promise((resolve, reject) => {
    let html = "";

    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });

    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        pipe(sink);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        console.error("[prerender] render error:", error);
      },
    });

    const timer = setTimeout(() => abort(), 15000);

    sink.on("finish", () => {
      clearTimeout(timer);
      resolve(html);
    });

    sink.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });

export async function render(url) {
  return collect(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
