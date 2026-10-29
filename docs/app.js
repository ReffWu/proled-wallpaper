const repository = 'https://github.com/ReffWu/proled-wallpaper';
const downloadBase = `${repository}/releases/latest/download/`;
const models = {
  pro16: { family: 'pro', name: 'MacBook Pro 16″', size: '16', width: 3456, height: 2234, mb: '19.3', image: 'device-pro16.webp', file: 'proled-macbook-pro-16-3456x2234.png' },
  pro14: { family: 'pro', name: 'MacBook Pro 14″', size: '14', width: 3024, height: 1964, mb: '14.9', image: 'device-pro14.webp', file: 'proled-macbook-pro-14-3024x1964.png' },
  air13: { family: 'air', name: 'MacBook Air 13″', size: '13', width: 2560, height: 1664, mb: '10.6', image: 'device-air13.webp', file: 'proled-macbook-air-13-2560x1664.png' },
  air15: { family: 'air', name: 'MacBook Air 15″', size: '15', width: 2880, height: 1864, mb: '13.4', image: 'device-air15.webp', file: 'proled-macbook-air-15-2880x1864.png' },
  studio: { family: 'studio', name: 'Studio Display', finish: 'straight', width: 5120, height: 2880, mb: '20.2', image: 'device-studio-straight.webp', file: 'proled-mac-studio-5k-straight-5120x2880.png' },
  studioRounded: { family: 'studio', name: 'Studio Display', finish: 'rounded', width: 5120, height: 2880, mb: '21.2', image: 'device-studio-rounded.webp', file: 'proled-mac-studio-5k-rounded-5120x2880.png' },
};
const copy = {
  en: {
    skip: 'Skip to the wallpaper', moreWork: 'More by ReffWu', navTag: 'Wallpapers for Mac',
    heroPromise: 'The new MacBook Pro look.<br>On your Mac.', chooseMac: 'Choose your Mac', allSizes: 'Download all sizes',
    heroNote: 'Free. Five Mac sizes. Full-resolution PNG.', finishTitle: 'A smoother<br>finish.',
    finishBody: 'The same silver-blue light. With refined lower curves that flow smoothly into pure black.',
    finishNote: 'A small detail, for a desktop you look at every day.', original: 'Original', rounded: 'Rounded', compareHint: 'Slide to see the difference.',
    downloadTitle: 'Made to fit your Mac.', downloadIntro: 'Choose your Mac. Your wallpaper is ready.', downloadPNG: 'Download PNG', allFive: 'All sizes + both 5K finishes',
    howTitle: 'A new desktop.<br>In a moment.', howBody: 'Download your PNG. Open System Settings → Wallpaper, then add the image. That’s it.', wallpaperHelp: 'How to change your Mac wallpaper',
    credit: 'Original artwork from Apple. Wallpaper recreation by <a href="https://basicappleguy.com/haberdashery/macbook-pro-proled-xdr" target="_blank" rel="noopener noreferrer">Basic Apple Guy</a>. Rounded edition by <a href="https://github.com/ReffWu">ReffWu</a>.',
    editionNote: 'An independent wallpaper adaptation. The PNGs preserve the available source detail; previews are resized for the web.', github: 'GitHub', behindDetails: 'Behind the details', credits: 'Credits', mediaKit: 'Media kit',
    compareAria: 'Compare original and rounded corners', familyAria: 'Choose your Mac family', sizeAria: 'Choose display size or corner finish', straight: 'Straight', roundedFinish: 'Four corners', straightDescription: '5K rectangular image, with no added corner mask.', roundedDescription: '5K image with four matching curves and pure-black corners.',
    proDescription: 'For the {width} × {height} display.', airDescription: 'For the {width} × {height} display.', air13Description: 'For the 13.6-inch display. M2 and later.', studioDescription: 'For a 5K, 16:9 display. Also fits Mac Studio setups.',
    title: 'PROLED Wallpaper — The new MacBook Pro look. On your Mac.',
  },
  zh: {
    skip: '跳转到壁纸', moreWork: '更多作品', navTag: 'Mac 壁纸',
    heroPromise: '新款 MacBook Pro 的光影，<br>来到你的桌面。', chooseMac: '选择我的 Mac', allSizes: '下载全部尺寸',
    heroNote: '免费下载 · 五种 Mac 尺寸 · 完整分辨率 PNG', finishTitle: '更顺滑的<br>底部圆角。',
    finishBody: '重新整理左右两侧的弧线，让银蓝光影平滑收进纯黑背景。',
    finishNote: '每天看见的桌面，值得这一点细致。', original: '原始版本', rounded: '圆角版本', compareHint: '拖动滑块，看看收边的变化。',
    downloadTitle: '为你的 Mac，选好尺寸。', downloadIntro: '选择机型，壁纸已为你准备好。', downloadPNG: '下载 PNG 壁纸', allFive: '全部尺寸与两种 5K 外观',
    howTitle: '换个桌面，<br>只需片刻。', howBody: '下载 PNG，在「系统设置 → 墙纸」中添加图片，即可换上。', wallpaperHelp: '了解如何更换 Mac 壁纸',
    credit: '原始视觉素材来自 Apple，壁纸由 <a href="https://basicappleguy.com/haberdashery/macbook-pro-proled-xdr" target="_blank" rel="noopener noreferrer">Basic Apple Guy</a> 提取适配，圆角版本由 <a href="https://github.com/ReffWu">ReffWu</a> 制作。',
    editionNote: '独立社区适配版本。下载的 PNG 保留现有母图细节；网页预览已缩小。', github: 'GitHub', behindDetails: '细节背后的制作', credits: '来源与署名', mediaKit: '营销素材包',
    compareAria: '对比原始版本与圆角版本', familyAria: '选择 Mac 系列', sizeAria: '选择尺寸或圆角外观', straight: '四角直边', roundedFinish: '四角圆角', straightDescription: '5K 原始矩形满幅，未添加圆角蒙版。', roundedDescription: '5K 四角采用一致的弧线，轮廓外侧纯黑。',
    proDescription: '适用于 {width} × {height} 分辨率的屏幕。', airDescription: '适用于 {width} × {height} 分辨率的屏幕。', air13Description: '适用于 M2 及以后机型的 13.6 英寸屏幕。', studioDescription: '适用于搭配 Mac Studio 等电脑的 5K、16:9 显示器。',
    title: 'PROLED Wallpaper — 新款 MacBook Pro 的光影，来到你的桌面。',
  },
};
let language = new URLSearchParams(location.search).get('lang');
if (!['en', 'zh'].includes(language)) {
  try { language = localStorage.getItem('proled_language'); } catch {}
  if (!['en', 'zh'].includes(language)) language = navigator.language.startsWith('zh') ? 'zh' : 'en';
}
let selectedModel = 'pro16';
const sizeContainer = document.querySelector('#model-sizes');
const compare = document.querySelector('#corner-compare');
const themeButton = document.querySelector('.theme-toggle');

function localizeAppearanceLabel() {
  const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  const label = language === 'zh' ? `切换为${dark ? '浅色' : '深色'}模式` : `Switch to ${dark ? 'light' : 'dark'} appearance`;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
}
function renderModel(key) {
  selectedModel = key;
  const model = models[key];
  const text = copy[language];
  const keepSizeFocus = Boolean(document.activeElement?.dataset.model);
  document.querySelectorAll('[data-family]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.family === model.family)));
  sizeContainer.replaceChildren();
  Object.entries(models).filter(([, value]) => value.family === model.family && (value.size || value.finish)).forEach(([id, value]) => {
    const button = document.createElement('button');
    button.type = 'button'; button.dataset.model = id;
    button.textContent = value.finish ? (value.finish === 'straight' ? text.straight : text.roundedFinish) : language === 'zh' ? `${value.size} 英寸` : `${value.size}-inch`;
    button.setAttribute('aria-pressed', String(id === key));
    button.addEventListener('click', () => renderModel(id));
    sizeContainer.append(button);
  });
  document.querySelector('#model-name').textContent = model.name;
  const description = model.family === 'studio' ? (model.finish === 'straight' ? text.straightDescription : text.roundedDescription) : key === 'air13' ? text.air13Description : model.family === 'air' ? text.airDescription : text.proDescription;
  document.querySelector('#model-description').textContent = description.replace('{width}', model.width).replace('{height}', model.height);
  document.querySelector('#file-spec').innerHTML = `${model.width} × ${model.height} <span>·</span> PNG <span>·</span> ${model.mb} MB`;
  document.querySelector('#download-link').href = downloadBase + model.file;
  document.querySelector('#download-link').setAttribute('aria-label', `${text.downloadPNG}: ${model.name}${model.finish ? ', ' + (model.finish === 'straight' ? text.straight : text.roundedFinish) : ''}, ${model.width} × ${model.height}`);
  const image = document.querySelector('#selected-image');
  image.src = `assets/${model.image}`; image.width = 1920; image.height = 1180;
  image.alt = `PROLED Wallpaper — ${model.name}${model.finish ? ', ' + (model.finish === 'straight' ? text.straight : text.roundedFinish) : ''}`;
  if (keepSizeFocus) sizeContainer.querySelector(`[data-model="${key}"]`)?.focus({ preventScroll: true });
}
function renderLanguage() {
  const text = copy[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = text.title;
  document.querySelectorAll('[data-i18n]').forEach(element => { if (text[element.dataset.i18n]) element.innerHTML = text[element.dataset.i18n]; });
  const toggle = document.querySelector('.language-toggle');
  toggle.textContent = language === 'en' ? '中文' : 'EN';
  toggle.setAttribute('aria-label', language === 'en' ? '切换为简体中文' : 'Switch to English');
  compare.setAttribute('aria-label', text.compareAria);
  document.querySelector('.model-families').setAttribute('aria-label', text.familyAria);
  sizeContainer.setAttribute('aria-label', text.sizeAria);
  renderModel(selectedModel);
  localizeAppearanceLabel();
}
document.querySelector('.language-toggle').addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  try { localStorage.setItem('proled_language', language); } catch {}
  renderLanguage();
});
document.querySelectorAll('[data-family]').forEach(button => button.addEventListener('click', () => {
  const first = { pro: 'pro16', air: 'air13', studio: 'studio' }[button.dataset.family];
  renderModel(first);
}));
compare.addEventListener('input', () => { document.querySelector('.comparison').style.setProperty('--split', `${compare.value}%`); });
new MutationObserver(localizeAppearanceLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', localizeAppearanceLabel);
renderLanguage();

document.addEventListener('DOMContentLoaded', localizeAppearanceLabel);
