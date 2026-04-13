import type {
  AppOptions,
  FontMode,
  Lang,
  Orientation,
  PaperSize,
} from "../types";
import { getDict } from "../i18n";

interface Props {
  lang: Lang;
  message: string;
  onMessageChange: (v: string) => void;
  options: AppOptions;
  onOptionsChange: (o: AppOptions) => void;
  effectiveFontPt: number;
  onPrint: () => void;
}

export function Controls({
  lang,
  message,
  onMessageChange,
  options,
  onOptionsChange,
  effectiveFontPt,
  onPrint,
}: Props) {
  const t = getDict(lang);
  const update = <K extends keyof AppOptions>(k: K, v: AppOptions[K]) => {
    onOptionsChange({ ...options, [k]: v });
  };

  const displayedFontPt =
    options.fontMode === "auto"
      ? Math.round(effectiveFontPt)
      : options.manualFontPt;

  return (
    <div className="controls">
      <div className="field">
        <label htmlFor="msg">{t.inputLabel}</label>
        <textarea
          id="msg"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder={t.inputPlaceholder}
          rows={8}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="paper">{t.paperSize}</label>
          <select
            id="paper"
            value={options.paperSize}
            onChange={(e) => update("paperSize", e.target.value as PaperSize)}
          >
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="orient">{t.orientation}</label>
          <select
            id="orient"
            value={options.orientation}
            onChange={(e) =>
              update("orientation", e.target.value as Orientation)
            }
          >
            <option value="landscape">{t.landscape}</option>
            <option value="portrait">{t.portrait}</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>{t.fontMode}</label>
        <div className="segmented">
          <button
            type="button"
            className={options.fontMode === "auto" ? "active" : ""}
            onClick={() => update("fontMode", "auto" as FontMode)}
          >
            {t.auto}
          </button>
          <button
            type="button"
            className={options.fontMode === "manual" ? "active" : ""}
            onClick={() => update("fontMode", "manual" as FontMode)}
          >
            {t.manual}
          </button>
        </div>
        <div className="field-row" style={{ marginTop: 8 }}>
          <div className="field">
            <label htmlFor="fontpt" className="sub">
              {t.fontPt}
            </label>
            <input
              id="fontpt"
              type="number"
              min={20}
              max={500}
              value={displayedFontPt}
              disabled={options.fontMode === "auto"}
              onChange={(e) =>
                update(
                  "manualFontPt",
                  Math.max(20, Math.min(500, parseInt(e.target.value) || 130)),
                )
              }
            />
          </div>
          <div className="field">
            <label htmlFor="gap" className="sub">
              {t.gap}
            </label>
            <input
              id="gap"
              type="number"
              min={0}
              max={50}
              value={options.gapMm}
              onChange={(e) =>
                update(
                  "gapMm",
                  Math.max(0, Math.min(50, parseInt(e.target.value) || 0)),
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="field">
        <label className="check">
          <input
            type="checkbox"
            checked={options.showCutMarks}
            onChange={(e) => update("showCutMarks", e.target.checked)}
          />
          {t.showCutMarks}
        </label>
      </div>

      <button type="button" className="print-btn" onClick={onPrint}>
        {t.printBtn}
      </button>
      <p className="hint">{t.hint}</p>
    </div>
  );
}
