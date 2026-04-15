/* lightbox.js
   Add class="lb-img" to any <img> to make it open full-screen on click.
   Close by clicking outside the image, pressing Escape, or the X button. */

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img class="lightbox-img" src="" alt="" />';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () { lbImg.src = ''; }, 200);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target !== lbImg) close();
  });

  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  function attachAll() {
    document.querySelectorAll('img.lb-img').forEach(function (img) {
      if (img.dataset.lbAttached) return;
      img.dataset.lbAttached = '1';
      img.addEventListener('click', function () { open(img.src, img.alt); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachAll);
  } else {
    attachAll();
  }

  /* Re-scan when accordion panels open */
  var observer = new MutationObserver(attachAll);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class']
  });
})();
