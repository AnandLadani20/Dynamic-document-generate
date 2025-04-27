import grapesjs from 'grapesjs';
import newsletterPlugin from 'grapesjs-preset-newsletter';

export function initGrapesJs(containerId: string) {
  return grapesjs.init({
    container: containerId,
    plugins: [newsletterPlugin],
    height: 'calc(100vh - 95px)',
    width: '100%',
    storageManager: false,
    panels: { defaults: [] }
  });
}
