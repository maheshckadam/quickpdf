/* ============================================
   QUICKPDF - SHARED UTILITIES
   ============================================ */

// Format file size
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Trigger file download
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Set status message
function setStatus(el, text, type = '') {
  if (!el) return;
  el.textContent = text;
  el.className = 'status' + (type ? ' ' + type : '');
}

// Drag and drop setup helper
function setupDropzone(dropzone, fileInput, onFiles) {
  if (!dropzone || !fileInput) return;

  const selectBtn = dropzone.querySelector('.btn-select');
  if (selectBtn) {
    selectBtn.addEventListener('click', e => {
      e.stopPropagation();
      fileInput.click();
    });
  }
  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', e => {
    if (e.target.files && e.target.files.length > 0) onFiles(e.target.files);
  });

  ['dragenter', 'dragover'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    });
  });
  dropzone.addEventListener('drop', e => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFiles(e.dataTransfer.files);
    }
  });
}

// Filter files by extension
function filterByExtension(files, extensions) {
  const exts = extensions.map(e => e.toLowerCase());
  return Array.from(files).filter(f => {
    const name = f.name.toLowerCase();
    return exts.some(ext => name.endsWith('.' + ext));
  });
}

// Render file list as HTML
function renderFileItems(files, options = {}) {
  const { reorder = false, removable = true } = options;
  return files.map((file, i) => {
    const ext = (file.name.split('.').pop() || 'file').toUpperCase().slice(0, 4);
    return `
      <div class="file-item" data-i="${i}">
        <div class="file-item-icon">${ext}</div>
        <div class="file-item-info">
          <div class="file-item-name">${escapeHtml(file.name)}</div>
          <div class="file-item-size">${formatSize(file.size)}</div>
        </div>
        <div class="file-item-actions">
          ${reorder ? `
            <button class="icon-btn" data-action="up" data-i="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
            <button class="icon-btn" data-action="down" data-i="${i}" ${i === files.length - 1 ? 'disabled' : ''} title="Move down">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          ` : ''}
          ${removable ? `
            <button class="icon-btn" data-action="remove" data-i="${i}" title="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Set button loading state
function setButtonLoading(btn, isLoading, originalText) {
  if (isLoading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Processing…';
  } else {
    btn.innerHTML = btn.dataset.originalText || originalText;
    btn.disabled = false;
  }
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function ensureToastContainer() {
  let c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}

const TOAST_ICONS = {
  success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  error:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
  info:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
};

function showToast(title, message = '', type = 'success', duration = 5000) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = `
    <div class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</div>
    <div class="toast-content">
      <div class="toast-title">${escapeHtml(title)}</div>
      ${message ? `<div class="toast-message">${escapeHtml(message)}</div>` : ''}
    </div>
    <button class="toast-close" type="button" aria-label="Dismiss">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  `;
  container.appendChild(toast);

  const remove = () => {
    if (toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  };
  toast.querySelector('.toast-close').addEventListener('click', remove);
  if (duration > 0) setTimeout(remove, duration);
  return toast;
}

/* ============================================
   FUN COMPLETION MESSAGES
   ============================================ */
const SUCCESS_MESSAGES = {
  merge:       ['Stitched together! 🪡', 'PDFs joined forces! ⚡', 'All combined and ready!', 'Mission accomplished! 🎯'],
  split:       ['Sliced and diced! 🔪', 'Pages set free! 🦋', 'Split successful!', 'Easy peasy! ✨'],
  compress:    ['Squeezed it tight! 🤏', 'Lighter and ready! 🪶', 'Compression complete!', 'Slim and trim! 💪'],
  'pdf-to-jpg': ['Snapshots ready! 📸', 'Images delivered! 🖼️', 'Pixel perfect! ✨', 'JPGs are yours! 🎨'],
  'word-to-pdf': ['Polished and PDF\'d! ✨', 'Document delivered!', 'Ready to share! 📄', 'Looks great!'],
  'pdf-to-word': ['Text extracted! 📝', 'Word doc ready!', 'All yours to edit!', 'Done and dusted! ✅'],
  edit:        ['Edited and ready! ✏️', 'Looking sharp! ✨', 'Polished to perfection!', 'Nailed it! 🎯'],
  organize:    ['Tidied up nicely! 📚', 'Pages reorganized!', 'Order restored! ✨', 'Looking organized! 🗂️'],
  watermark:   ['Watermarked! 💧', 'Stamped and sealed! 🔖', 'Branded and ready!', 'Mark applied! ✨'],
  sign:        ['Signed and sealed! ✍️', 'Your John Hancock is on it!', 'Signature applied! 🖋️', 'Officially yours!'],
  unlock:      ['Unlocked! 🔓', 'Free as a bird!', 'Password removed! ✨', 'No more locks! 🗝️'],
  ocr:         ['Text extracted! 🤖', 'OCR magic complete! ✨', 'Words liberated! 📖', 'Scanned and read!'],
  protect:     ['Locked tight! 🔒', 'Protected and secure!', 'Password set! 🛡️', 'Encrypted! ✨']
};

function getRandomSuccess(toolKey) {
  const msgs = SUCCESS_MESSAGES[toolKey] || ['All done! ✨'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

/* ============================================
   DROPZONE / DONE-STATE HELPERS
   ============================================ */
// Hide the dropzone after a file is loaded so it's clear the file is ready
function hideDropzone(dropzone) {
  if (dropzone) dropzone.classList.add('hidden');
}
function showDropzone(dropzone) {
  if (dropzone) dropzone.classList.remove('hidden');
}

// Show the success "done" state with a button to convert more files
function showDoneState(container, toolLabel, onRestart) {
  if (!container) return;
  container.innerHTML = `
    <div class="done-state">
      <div class="done-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <h3>All set!</h3>
      <p>Your file has been downloaded. Want to do more?</p>
      <div class="done-actions">
        <button type="button" class="btn-restart" id="restartBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          ${escapeHtml(toolLabel)}
        </button>
        <a href="index.html" class="btn-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
          Try another tool
        </a>
      </div>
    </div>
  `;
  const restartBtn = container.querySelector('#restartBtn');
  if (restartBtn && onRestart) {
    restartBtn.addEventListener('click', onRestart);
  }
}
