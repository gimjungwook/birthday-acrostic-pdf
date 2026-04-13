import { measureWordMm } from "./measure";
import type { PackedPage } from "../types";

export interface PackArgs {
  words: string[];
  fontPt: number;
  pageWidthMm: number;
  gapMm: number;
}

const SAFETY_MM = 4;

export function pack({
  words,
  fontPt,
  pageWidthMm,
  gapMm,
}: PackArgs): PackedPage[] {
  const budget = pageWidthMm - SAFETY_MM;
  const pages: PackedPage[] = [];
  let current: PackedPage = { words: [], widthsMm: [] };

  for (const w of words) {
    const wMm = measureWordMm(w, fontPt);
    const nextCount = current.words.length + 1;
    const nextSum = sum(current.widthsMm) + wMm;
    // Layout: [cut] gap w1 gap w2 gap ... wN gap [cut]
    // => sum(widths) + (N + 1) * gap
    const nextTotal = nextSum + (nextCount + 1) * gapMm;

    if (nextTotal <= budget) {
      current.words.push(w);
      current.widthsMm.push(wMm);
    } else {
      if (current.words.length > 0) pages.push(current);
      current = { words: [w], widthsMm: [wMm] };
    }
  }
  if (current.words.length > 0) pages.push(current);
  return pages;
}

export function autoFontPt(
  words: string[],
  pageWidthMm: number,
  gapMm: number,
): number {
  if (words.length === 0) return 130;
  const budget = pageWidthMm - SAFETY_MM;
  let lo = 20;
  let hi = 500;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const maxW = Math.max(...words.map((w) => measureWordMm(w, mid)));
    const needed = maxW + 2 * gapMm;
    if (needed <= budget) lo = mid;
    else hi = mid;
  }
  return Math.max(20, Math.floor(lo));
}

export function detectOverflow(
  pages: PackedPage[],
  pageWidthMm: number,
  gapMm: number,
): string | null {
  const budget = pageWidthMm - SAFETY_MM;
  for (const p of pages) {
    if (p.words.length === 1) {
      const total = p.widthsMm[0] + 2 * gapMm;
      if (total > budget) return p.words[0];
    }
  }
  return null;
}

function sum(arr: number[]): number {
  let s = 0;
  for (const v of arr) s += v;
  return s;
}
