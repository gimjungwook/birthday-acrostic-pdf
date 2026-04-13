const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans CJK KR", "Helvetica Neue", Helvetica, Arial, sans-serif';

let cachedCtx: CanvasRenderingContext2D | null = null;
function getCtx(): CanvasRenderingContext2D {
  if (cachedCtx) return cachedCtx;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D not available");
  cachedCtx = ctx;
  return ctx;
}

const PX_PER_MM = 3.7795275591; // 96dpi

export function measureWordMm(word: string, fontPt: number): number {
  const ctx = getCtx();
  const fontPx = (fontPt * 4) / 3;
  ctx.font = `700 ${fontPx}px ${FONT_FAMILY}`;
  const widthPx = ctx.measureText(word).width;
  return widthPx / PX_PER_MM;
}
