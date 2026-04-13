import type { CSSProperties, ReactNode } from "react";
import type { AppOptions, PackedPage } from "../types";

interface Props {
  page: PackedPage;
  pageNum: number;
  totalPages: number;
  paperWidthMm: number;
  paperHeightMm: number;
  fontPt: number;
  options: AppOptions;
  scale: number;
}

export function PageCard({
  page,
  pageNum,
  totalPages,
  paperWidthMm,
  paperHeightMm,
  fontPt,
  options,
  scale,
}: Props) {
  const items: ReactNode[] = [];
  items.push(<CutLine key="cut-left" show={options.showCutMarks} />);
  page.words.forEach((w, i) => {
    items.push(
      <div key={`w-${i}`} className="word" style={{ fontSize: `${fontPt}pt` }}>
        {w}
      </div>,
    );
  });
  items.push(<CutLine key="cut-right" show={options.showCutMarks} />);

  const wrapperStyle: CSSProperties = {
    width: `calc(${paperWidthMm}mm * ${scale})`,
    height: `calc(${paperHeightMm}mm * ${scale})`,
  };

  const pageStyle: CSSProperties = {
    width: `${paperWidthMm}mm`,
    height: `${paperHeightMm}mm`,
    transform: `scale(${scale})`,
  };

  const rowStyle: CSSProperties = {
    gap: `${options.gapMm}mm`,
  };

  return (
    <div className="page-wrapper" style={wrapperStyle}>
      <div className="page" style={pageStyle}>
        <div className="word-row" style={rowStyle}>
          {items}
        </div>
        <div className="pagenum">
          {pageNum}/{totalPages}
        </div>
      </div>
    </div>
  );
}

function CutLine({ show }: { show: boolean }) {
  return (
    <div className={`cut-line ${show ? "" : "hidden"}`}>
      {show && <span className="cut-label">✂</span>}
    </div>
  );
}
