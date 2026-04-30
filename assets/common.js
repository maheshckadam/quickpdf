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
