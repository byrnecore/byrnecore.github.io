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
  const fadeTargets = document.querySelectorAll('[data-fade-in]');
  if (!fadeTargets.length) return;

  fadeTargets.forEach((el) => {
    const container = el.closest('[data-fade-container]');
    const markLoaded = () => {
      el.classList.add('is-visible');
      if (container) {
        container.classList.add('is-loaded');
      }
    };

    if (el instanceof HTMLImageElement) {
      if (el.complete && el.naturalWidth > 0) {
        // Already loaded (cached)
        requestAnimationFrame(markLoaded);
        return;
      }

      el.addEventListener('load', () => {
        requestAnimationFrame(markLoaded);
      }, { once: true });

      el.addEventListener('error', () => {
        requestAnimationFrame(markLoaded);
      }, { once: true });
      return;
    }

    if (el instanceof HTMLVideoElement) {
      const markWhenReady = () => {
        requestAnimationFrame(markLoaded);
      };

      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        requestAnimationFrame(markLoaded);
        return;
      }

      el.addEventListener('loadeddata', markWhenReady, { once: true });
      el.addEventListener('canplay', markWhenReady, { once: true });
      el.addEventListener('error', markWhenReady, { once: true });
      return;
    }

    // Fallback: immediately mark non-image/video elements
    requestAnimationFrame(markLoaded);
  });
});
