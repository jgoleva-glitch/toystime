function classify(url) {
  if (!url) return null;
  url = url.trim();
  if (!url) return null;

  if (/(disk\.yandex\.|yadi\.sk)/i.test(url)) return { type: 'yandex', share: url };

  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
  if (m) return { type: 'iframe', src: `https://www.youtube.com/embed/${m[1]}` };

  m = url.match(/vk\.com\/video(-?\d+)_(\d+)/);
  if (m) return { type: 'iframe', src: `https://vk.com/video_ext.php?oid=${m[1]}&id=${m[2]}&hd=2` };

  m = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/);
  if (m) return { type: 'iframe', src: `https://rutube.ru/play/embed/${m[1]}` };

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(url)) return { type: 'video', src: url };

  return { type: 'iframe', src: url };
}

// Свежая прямая ссылка на файл Яндекс.Диска (действует ограниченное время,
// поэтому запрашиваем её в момент клика).
async function yandexDirectUrl(share) {
  const api =
    'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=' +
    encodeURIComponent(share);
  const r = await fetch(api);
  if (!r.ok) throw new Error('Yandex API ' + r.status);
  const data = await r.json();
  if (!data.href) throw new Error('no href');
  return data.href;
}

function mountIframe(slot, src) {
  const sep = src.includes('?') ? '&' : '?';
  slot.innerHTML = `<iframe src="${src}${sep}autoplay=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  slot.classList.add('has-video');
}

function mountVideo(slot, src, poster) {
  slot.innerHTML = `<video src="${src}"${poster ? ` poster="${poster}"` : ''} controls autoplay playsinline></video>`;
  slot.classList.add('has-video');
}

function loadAndPlay(slot, info, poster) {
  if (info.type === 'iframe') {
    mountIframe(slot, info.src);
    return;
  }
  if (info.type === 'video') {
    mountVideo(slot, info.src, poster);
    return;
  }
  // yandex — сначала получаем прямую ссылку
  slot.classList.add('loading');
  yandexDirectUrl(info.share)
    .then((href) => {
      slot.classList.remove('loading');
      mountVideo(slot, href, poster);
    })
    .catch(() => {
      slot.classList.remove('loading');
      slot.classList.add('error');
    });
}

function renderVideos() {
  document.querySelectorAll('[data-slug]').forEach((slot) => {
    const slug = slot.getAttribute('data-slug');
    const url = (typeof VIDEOS !== 'undefined' ? VIDEOS : {})[slug];
    const info = classify(url);
    const playBtn = slot.querySelector('.play-btn');

    if (!info) {
      // видео пока нет — оставляем только фото-постер
      if (playBtn) playBtn.remove();
      slot.classList.add('no-video');
      return;
    }

    const img = slot.querySelector('img');
    const poster = img ? img.getAttribute('src') : '';
    slot.classList.add('clickable');

    slot.addEventListener('click', () => {
      if (slot.classList.contains('has-video') || slot.classList.contains('loading')) return;
      loadAndPlay(slot, info, poster);
    });
  });
}

document.addEventListener('DOMContentLoaded', renderVideos);
