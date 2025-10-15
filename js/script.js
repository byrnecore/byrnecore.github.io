// Email copy: supports one or many .emailAction elements
document.addEventListener('DOMContentLoaded', () => {
  document.body?.classList.add('js-enabled');
  const els = document.querySelectorAll('.emailAction');
  if (!els.length) return;

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }

  els.forEach((btn) => {
    const email = btn.dataset.email || btn.textContent.trim();

    // Click + keyboard (Enter/Space) support
    btn.addEventListener('click', async () => {
      try {
        await copyText(email);
        btn.classList.add('copied');
        clearTimeout(btn._t);
        btn._t = setTimeout(() => btn.classList.remove('copied'), 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const fadeImages = document.querySelectorAll('img[data-fade-in]');
  if (!fadeImages.length) return;

  fadeImages.forEach((img) => {
    const container = img.closest('[data-fade-container]');
    const markLoaded = () => {
      img.classList.add('is-visible');
      if (container) {
        container.classList.add('is-loaded');
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      // Already loaded (cached)
      requestAnimationFrame(markLoaded);
      return;
    }

    img.addEventListener('load', () => {
      requestAnimationFrame(markLoaded);
    }, { once: true });

    img.addEventListener('error', () => {
      img.classList.add('is-visible');
      if (container) {
        container.classList.add('is-loaded');
      }
    }, { once: true });
  });
});
