/* PoBalkanim analytics: basic consent, public pages only. */
(function () {
  'use strict';
  if (window.pbAnalyticsReady) return;
  window.pbAnalyticsReady = true;
  var allowed = ['/', '/index.html', '/about.html', '/business.html', '/company.html', '/digital-nomad.html', '/documents.html', '/mup-budva.html', '/renewal.html', '/reviews.html', '/schools.html', '/vnzh.html', '/rent-in-montenegro.html', '/why-we-moved.html', '/moving-to-montenegro.html', '/montenegro-visa-2026.html', '/montenegro-for-russians.html'];
  if (location.hostname !== 'pobalkanim.com' || allowed.indexOf(location.pathname) < 0) return;
  var key = 'pb-analytics-consent-v1', active = false, panel, choice = null;
  try { var saved = JSON.parse(localStorage.getItem(key)); if (saved && Date.now() - saved.time < 15552000000) choice = saved.value; } catch (e) {}
  function cleanUrl(value) {
    try { var u = new URL(value); return u.protocol === 'https:' || u.protocol === 'http:' ? u.origin + u.pathname : ''; } catch (e) { return ''; }
  }
  function load(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function start() {
    if (active) return;
    active = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent', 'update', {analytics_storage:'granted'});
    window.gtag('js', new Date());
    window.gtag('config', 'G-5QLBM8K6SM', {page_location:cleanUrl(location.href),page_referrer:cleanUrl(document.referrer),allow_google_signals:false,allow_ad_personalization_signals:false});
    load('https://www.googletagmanager.com/gtag/js?id=G-5QLBM8K6SM');
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    window.ym(113279154, 'init', {webvisor:false,clickmap:false,trackLinks:false,accurateTrackBounce:true,url:cleanUrl(location.href),referrer:cleanUrl(document.referrer)});
    load('https://mc.yandex.ru/metrika/tag.js?id=113279154');
  }
  function choose(value) {
    choice = value;
    try { localStorage.setItem(key, JSON.stringify({value:value,time:Date.now()})); } catch (e) {}
    panel.hidden = true;
    if (value === 'granted') start();
    else if (active) {
      window['ga-disable-G-5QLBM8K6SM'] = true;
      window.ym(113279154, 'destruct');
      document.cookie.split(';').forEach(function (part) {
        var name = part.trim().split('=')[0];
        if (!/^(_ga|_ym_)/.test(name)) return;
        ['', '; domain=pobalkanim.com', '; domain=.pobalkanim.com'].forEach(function (domain) { document.cookie = name + '=; max-age=0; path=/' + domain + '; SameSite=Lax'; });
      });
      location.reload();
    }
  }
  var style = document.createElement('style');
  style.textContent = '.pb-analytics-panel{position:fixed;z-index:10000;left:20px;bottom:84px;width:min(440px,calc(100vw - 40px));box-sizing:border-box;padding:22px;background:#f7f5ec;color:#183d33;border:1px solid #a17b37;border-radius:14px;box-shadow:0 8px 36px #183d3326;font:14px/1.55 Manrope,Arial,sans-serif}.pb-analytics-panel[hidden]{display:none}.pb-analytics-panel h2{margin:0 0 8px;font:600 21px/1.2 Manrope,Arial,sans-serif}.pb-analytics-panel p{margin:0 0 14px}.pb-analytics-actions{display:flex;gap:10px;flex-wrap:wrap}.pb-analytics-actions button{flex:1;min-width:145px;padding:10px 12px;border:1px solid #89652c;border-radius:7px;background:#f7f5ec;color:#183d33;font:600 13px Manrope,Arial,sans-serif;cursor:pointer}.pb-analytics-actions button:focus-visible,.pb-analytics-settings:focus-visible{outline:3px solid #a17b37;outline-offset:3px}.pb-analytics-actions button:hover{background:#eae4d4}.pb-analytics-settings{display:block;margin:14px 0 0;padding:0;background:none;border:0;color:inherit;text-decoration:underline;font:inherit;font-size:12px;cursor:pointer}.pb-analytics-panel details{margin:12px 0;font-size:12px}.pb-analytics-panel a{color:inherit;text-decoration:underline}';
  document.head.appendChild(style);
  panel = document.createElement('section');
  panel.className = 'pb-analytics-panel'; panel.setAttribute('aria-label', 'Настройки аналитики');
  panel.innerHTML = '<h2>Поможете улучшить сайт?</h2><p>С вашего разрешения Яндекс Метрика и Google Analytics посчитают посещения и покажут, какие страницы читают чаще. Для этого используются cookies. Отказ не влияет на работу сайта.</p><details><summary>Какие данные собираются</summary><p>Адрес страницы без параметров, источник перехода и сведения о браузере и устройстве передаются Яндексу и Google. Запись действий и содержимого форм отключена. Выбор можно изменить внизу страницы.</p><a href="https://yandex.ru/legal/confidential/" target="_blank" rel="noopener noreferrer">Политика Яндекса</a> · <a href="https://policies.google.com/privacy?hl=ru" target="_blank" rel="noopener noreferrer">Политика Google</a></details><div class="pb-analytics-actions"><button type="button" data-choice="granted">Разрешить</button><button type="button" data-choice="denied">Не разрешать</button></div>';
  panel.querySelectorAll('[data-choice]').forEach(function (button) { button.addEventListener('click', function () { choose(button.dataset.choice); }); });
  document.body.appendChild(panel);
  var settings = document.createElement('button'); settings.type = 'button'; settings.className = 'pb-analytics-settings'; settings.textContent = 'Настройки аналитики';
  settings.addEventListener('click', function () { panel.hidden = false; panel.querySelector('button').focus(); });
  (document.querySelector('footer') || document.body).appendChild(settings);
  panel.hidden = choice === 'granted' || choice === 'denied';
  if (choice === 'granted') start();
})();

document.querySelectorAll('[data-video]').forEach(box=>{box.querySelector('button').addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+box.dataset.video;iframe.title='Видео PoBalkanim';iframe.allow='encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;box.replaceChildren(iframe);});});
const filter=document.querySelector('#review-topic');if(filter){filter.parentElement.hidden=false;filter.addEventListener('change',()=>{document.querySelectorAll('[data-topic]').forEach(q=>{q.hidden=filter.value!=='all'&&q.dataset.topic!==filter.value;});});}
