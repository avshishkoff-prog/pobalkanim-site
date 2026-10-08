(() => {
  const form = document.getElementById('pb-renewal-form');
  if (!form) return;
  const request = document.getElementById('pb-mup-request');
  const deadlineLabel = document.getElementById('pb-deadline-label');
  request.addEventListener('change', () => { deadlineLabel.hidden = request.value !== 'Есть'; });
  const draft = document.getElementById('pb-renewal-draft');
  const syncTelegram = () => { document.getElementById('pb-renewal-telegram').href = 'https://t.me/pobalkanimnow?text=' + encodeURIComponent(draft.value); };
  draft.addEventListener('input', syncTelegram);
  const status = document.getElementById('pb-renewal-status');
  const formatDate = value => value ? value.split('-').reverse().join('.') : 'не указан';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = ['Здравствуйте, Алексей! Хочу проверить подготовку к продлению ВНЖ.',
      'Срок карты: ' + formatDate(data.get('expiry')),
      'Основание: ' + data.get('basis'),
      'Заявителей: ' + data.get('people'),
      'Запрос МУП: ' + data.get('request')];
    if (data.get('request') === 'Есть') lines.push('Срок ответа: ' + formatDate(data.get('deadline')));
    lines.push('Изменения: ' + (data.get('changes').trim() || 'уточню в переписке'),
      'Источник: pobalkanim.com/renewal.html');
    draft.value = lines.join('\n');
    syncTelegram();
    document.getElementById('pb-renewal-result').hidden = false;
    status.textContent = 'Сообщение подготовлено, но ещё не отправлено. Если Telegram не подставит текст, скопируйте его и вставьте в чат.';
    draft.focus();
  });
  document.getElementById('pb-renewal-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draft.value);
      status.textContent = 'Текст скопирован. Откройте чат с Алексеем и отправьте сообщение.';
    } catch {
      draft.focus(); draft.select();
      status.textContent = 'Текст выделен. Скопируйте его вручную и вставьте в Telegram.';
    }
  });
})();