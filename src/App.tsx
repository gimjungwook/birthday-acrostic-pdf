import { useMemo, useState } from "react";
import { Controls } from "./components/Controls";
import { PageCard } from "./components/PageCard";
import { getDict } from "./i18n";
import { autoFontPt, detectOverflow, pack } from "./lib/pack";
import type { AppOptions, Lang, PaperDims } from "./types";

const DEFAULT_MESSAGE = `축하해 오늘은 너의 날!
하루하루 웃음 가득하길
해마다 더 빛나는 너이길`;

const DEFAULT_OPTIONS: AppOptions = {
  paperSize: "A4",
  orientation: "landscape",
  fontMode: "auto",
  manualFontPt: 130,
  gapMm: 15,
  showCutMarks: true,
};

function paperDims(options: AppOptions): PaperDims {
  const sizes: Record<AppOptions["paperSize"], [number, number]> = {
    A4: [210, 297],
    Letter: [215.9, 279.4],
  };
  const [short, long] = sizes[options.paperSize];
  return options.orientation === "landscape"
    ? { width: long, height: short }
    : { width: short, height: long };
}

const PREVIEW_SCALE = 0.35;

export default function App() {
  const [lang, setLang] = useState<Lang>("ko");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [options, setOptions] = useState<AppOptions>(DEFAULT_OPTIONS);

  const t = getDict(lang);
  const words = useMemo(
    () => message.split(/\s+/).filter(Boolean),
    [message],
  );
  const dims = paperDims(options);

  const effectiveFontPt = useMemo(() => {
    if (words.length === 0) return options.manualFontPt;
    if (options.fontMode === "auto") {
      return autoFontPt(words, dims.width, options.gapMm);
    }
    return options.manualFontPt;
  }, [words, options.fontMode, options.manualFontPt, dims.width, options.gapMm]);

  const pages = useMemo(() => {
    if (words.length === 0) return [];
    return pack({
      words,
      fontPt: effectiveFontPt,
      pageWidthMm: dims.width,
      gapMm: options.gapMm,
    });
  }, [words, effectiveFontPt, dims.width, options.gapMm]);

  const overflowed = useMemo(
    () => detectOverflow(pages, dims.width, options.gapMm),
    [pages, dims.width, options.gapMm],
  );

  const printPageCss = `@media print { @page { size: ${dims.width}mm ${dims.height}mm; margin: 0; } }`;

  return (
    <div className="app">
      <style dangerouslySetInnerHTML={{ __html: printPageCss }} />
      <header>
        <div className="header-text">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="lang-toggle" role="group" aria-label="language">
          <button
            type="button"
            className={lang === "ko" ? "active" : ""}
            onClick={() => setLang("ko")}
          >
            한국어
          </button>
          <button
            type="button"
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
      </header>

      <main>
        <aside className="controls-panel">
          <Controls
            lang={lang}
            message={message}
            onMessageChange={setMessage}
            options={options}
            onOptionsChange={setOptions}
            effectiveFontPt={effectiveFontPt}
            onPrint={() => window.print()}
          />
        </aside>

        <section className="preview-panel">
          <div className="preview-header">
            <h2>{t.previewTitle}</h2>
            <span className="page-count">{t.pageCount(pages.length)}</span>
          </div>

          {overflowed && (
            <div className="warn">{t.overflowWarn(overflowed)}</div>
          )}

          {words.length === 0 ? (
            <div className="empty">{t.emptyWords}</div>
          ) : (
            <div className="preview-grid">
              {pages.map((page, i) => (
                <PageCard
                  key={i}
                  page={page}
                  pageNum={i + 1}
                  totalPages={pages.length}
                  paperWidthMm={dims.width}
                  paperHeightMm={dims.height}
                  fontPt={effectiveFontPt}
                  options={options}
                  scale={PREVIEW_SCALE}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
