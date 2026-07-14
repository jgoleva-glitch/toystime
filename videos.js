// ЗДЕСЬ вставляются ссылки на видео к каждой игрушке.
// Как пользоваться:
// 1. Найдите нужный товар по названию (ключ слева).
// 2. Вставьте ссылку между кавычками справа. Подходят:
//    - ЛОКАЛЬНЫЙ ФАЙЛ (рекомендуется) — положите webm/mp4 в папку video/ и укажите путь,
//      например 'video/magic-mouse.webm'  (см. video/КАК-ДОБАВИТЬ-ВИДЕО.txt)
//    - публичная ссылка Яндекс.Диска (https://disk.yandex.ru/i/... или https://yadi.sk/i/...)
//    - обычная ссылка на YouTube     (https://www.youtube.com/watch?v=...  или https://youtu.be/...)
//    - ссылка на видео VK             (https://vk.com/video-123456_78910)
//    - ссылка на Rutube              (https://rutube.ru/video/xxxxxxxx/)
// 3. Сохраните файл — на сайте видео появится автоматически, ничего больше менять не нужно.
// Если ссылки пока нет — оставьте пустые кавычки '', на сайте будет показано фото товара.
//
// Локальные файлы надёжнее всего: сайт ни от чего не зависит. Держите каждый ролик до ~24 МБ.
// Про Яндекс.Диск: файл должен быть открыт по ссылке («Поделиться» → «Скопировать ссылку»).

const VIDEOS = {
  'magic-mouse': 'https://disk.yandex.ru/i/yszB2ah_S7AJzg', // webm ещё нет — играет с Яндекс.Диска
  'magic-tail': 'video/magic-tail.webm',
  'magic-twins': 'video/magic-twins.webm',
  'magic-snail': 'video/magic-snail.webm',
  'magic-spin': 'video/magic-spin.webm',
  'magic-box': 'video/magic-box.webm',
  'magic-ring': 'video/magic-ring.webm',
  'magic-bounce': 'video/magic-bounce.webm',
  'magic-bounce-pro': 'video/magic-bounce-pro.webm',
  'magic-bob': '',
  'doggy-pull': 'video/doggy-pull.webm',
  'doggy-boost': '',
};
