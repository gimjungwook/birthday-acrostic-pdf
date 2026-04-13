export type Lang = "ko" | "en";
export type PaperSize = "A4" | "Letter";
export type Orientation = "landscape" | "portrait";
export type FontMode = "auto" | "manual";

export interface AppOptions {
  paperSize: PaperSize;
  orientation: Orientation;
  fontMode: FontMode;
  manualFontPt: number;
  gapMm: number;
  showCutMarks: boolean;
}

export interface PackedPage {
  words: string[];
  widthsMm: number[];
}

export interface PaperDims {
  width: number;
  height: number;
}
