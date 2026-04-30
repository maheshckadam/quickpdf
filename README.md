# Quickpdf

Free, fast, and private PDF tools. Everything runs in your browser — files never leave your device.

## Live Tools

| Tool | Status | What it does |
|------|--------|--------------|
| Merge PDF | ✅ Live | Combine multiple PDFs into one, in any order |
| Split PDF | ✅ Live | Extract specific pages or split into individual files |
| Compress PDF | ✅ Live | Reduce file size with adjustable quality |
| Organize PDF | ✅ Live | Drag to reorder, rotate, or delete pages visually |
| Watermark PDF | ✅ Live | Add text or image watermark to all pages |
| Sign PDF | ✅ Live | Draw your signature and place it on any page |
| Unlock PDF | ✅ Live | Remove password protection (requires password) |
| OCR PDF | ✅ Live | Extract text from scanned PDFs using Tesseract.js |
| Word to PDF | ✅ Live | Convert .docx files to PDF |
| PDF to JPG | ✅ Live | Convert each page to a high-quality JPG image |
| Edit PDF | ✅ Live | Add watermarks, text, and page numbers |
| Protect PDF | ✅ Live | Password-protect PDFs with RC4 128-bit encryption |
| PDF to Word | ⚠️ Basic | Text-only extraction (full conversion needs server) |

## File Structure

```
quickpdf/
├── index.html
├── merge.html  split.html  compress.html
├── organize.html  watermark.html  sign.html
├── unlock.html  ocr.html  protect.html
├── pdf-to-jpg.html  word-to-pdf.html  pdf-to-word.html  edit.html
└── assets/
    ├── styles.css
    └── common.js
```

## Tech Stack

Pure HTML/CSS/JavaScript — no build step. Libraries from CDN:
- **pdf-lib** — merging, splitting, editing, watermarking, signing
- **pdf.js** — rendering, text extraction, password decryption
- **jsPDF** — compression and Word→PDF
- **mammoth.js** — parsing .docx files
- **html2pdf.js** — HTML to PDF
- **Tesseract.js** — browser OCR
- **JSZip** — ZIP downloads

## Privacy

No analytics. No tracking. No file uploads. Everything happens in your browser.

## Deploying

Upload all files (preserving folder structure) to GitHub. Vercel auto-deploys.
