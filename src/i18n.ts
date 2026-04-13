import type { Lang } from "./types";

export interface Dict {
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  paperSize: string;
  orientation: string;
  landscape: string;
  portrait: string;
  fontMode: string;
  auto: string;
  manual: string;
  fontPt: string;
  gap: string;
  showCutMarks: string;
  printBtn: string;
  previewTitle: string;
  pageCount: (n: number) => string;
  emptyWords: string;
  hint: string;
  overflowWarn: (w: string) => string;
}

export const translations: Record<Lang, Dict> = {
  ko: {
    title: "생일 게시판 삼행시 PDF 생성기",
    subtitle:
      "아무 메시지나 입력하면 자동으로 단어별로 나누고, 종이 한 장에 여러 단어를 배치한 뒤 절단선까지 그려줍니다.",
    inputLabel: "메시지",
    inputPlaceholder: "예) 축하해 오늘은 너의 날...",
    paperSize: "용지",
    orientation: "방향",
    landscape: "가로",
    portrait: "세로",
    fontMode: "글자 크기 모드",
    auto: "자동 최대",
    manual: "수동",
    fontPt: "크기 (pt)",
    gap: "여백 (mm)",
    showCutMarks: "절단선(✂) 표시",
    printBtn: "인쇄 / PDF 저장",
    previewTitle: "미리보기",
    pageCount: (n) => `총 ${n}페이지`,
    emptyWords: "메시지를 입력하세요.",
    hint: '브라우저 인쇄 창에서 "PDF로 저장"을 선택하면 파일로 받을 수 있어요. 인쇄 설정의 "배율"은 100% 또는 "실제 크기"로 두세요.',
    overflowWarn: (w) =>
      `"${w}"이(가) 한 페이지에 들어가지 않습니다. 글자 크기나 여백을 줄이세요.`,
  },
  en: {
    title: "Birthday Board Acrostic PDF Generator",
    subtitle:
      "Type any message, and we'll split it into words, pack them onto pages, and draw cut lines.",
    inputLabel: "Message",
    inputPlaceholder: "e.g. Happy birthday friend...",
    paperSize: "Paper",
    orientation: "Orientation",
    landscape: "Landscape",
    portrait: "Portrait",
    fontMode: "Font size mode",
    auto: "Auto-max",
    manual: "Manual",
    fontPt: "Size (pt)",
    gap: "Gap (mm)",
    showCutMarks: "Show cut marks (✂)",
    printBtn: "Print / Save as PDF",
    previewTitle: "Preview",
    pageCount: (n) => `${n} page${n === 1 ? "" : "s"} total`,
    emptyWords: "Enter a message to start.",
    hint: 'In the print dialog, choose "Save as PDF". Keep scaling at 100% or "Actual size".',
    overflowWarn: (w) =>
      `"${w}" doesn't fit on one page — reduce the font size or the gap.`,
  },
};

export const getDict = (lang: Lang): Dict => translations[lang];
