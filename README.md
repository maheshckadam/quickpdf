# Quickpdf

Free, fast, and private PDF tools. Everything runs in your browser — files never leave your device.

## Live Tools

| Tool | Status | What it does |
|------|--------|--------------|
| Merge PDF | ✅ Live | Combine multiple PDFs into one, in any order |
| Split PDF | ✅ Live | Extract specific pages or split into individual files |
| Compress PDF | ✅ Live | Reduce file size with adjustable quality |
| Word to PDF | ✅ Live | Convert .docx files to PDF |
| PDF to JPG | ✅ Live | Convert each page to a high-quality JPG image |
| Edit PDF | ✅ Live | Add watermarks, text, and page numbers |
| PDF to Word | ⚠️ Basic | Text-only extraction (full conversion coming soon — needs a server) |

## File Structure

```
quickpdf/
├── index.html              # Homepage
├── merge.html              # Merge PDF tool
├── split.html              # Split PDF tool
├── compress.html           # Compress PDF tool
├── pdf-to-jpg.html         # PDF to JPG converter
├── word-to-pdf.html        # Word to PDF converter
├── pdf-to-word.html        # PDF to Word (basic text extract)
├── edit.html               # Edit PDF (watermarks, page numbers)
└── assets/
    ├── styles.css          # Shared CSS
    └── common.js           # Shared JS utilities
```

## Tech Stack

- **Pure HTML/CSS/JavaScript** — no build step, no framework
- **pdf-lib** — for merging, splitting, editing PDFs
- **pdf.js** (Mozilla) — for rendering PDFs and extracting text
- **jsPDF** — for generating compressed PDFs and Word→PDF
- **mammoth.js** — for parsing .docx files
- **html2pdf.js** — for converting HTML to PDF
- **JSZip** — for creating ZIP downloads

All libraries loaded from CDN — no installation needed.

## Deploying to Vercel

1. Upload all files (preserving the folder structure) to your GitHub repo
2. Vercel auto-deploys on every push
3. That's it — no build configuration needed

## Roadmap

- [ ] PDF to Word with full formatting (needs server/API)
- [ ] OCR (scanned PDF → searchable text)
- [ ] Sign PDF
- [ ] Unlock encrypted PDFs
- [ ] Rotate / Reorder pages
- [ ] Watermark with images
- [ ] Compare PDFs

## Privacy

No analytics. No tracking. No file uploads. Everything happens in your browser.

## License

Free for personal and commercial use.
