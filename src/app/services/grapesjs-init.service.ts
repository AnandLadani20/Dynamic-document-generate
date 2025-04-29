import grapesjs from 'grapesjs';
import newsletterPlugin from 'grapesjs-preset-newsletter';

export function initGrapesJs(containerId: string) {
  const editor = grapesjs.init({
    container: containerId,
    plugins: [newsletterPlugin],
    height: 'calc(100vh - 95px)',
    width: '100%',
    storageManager: false,
    panels: { defaults: [] }
  });

  // Override the 'preview' command to log when preview starts
  editor.Commands.add('preview', {
    run(editor, sender) {
      console.log('Preview started');
      editor.runCommand('core:preview');

      // Disable the preview button after preview starts
      if (sender) {
        sender.set('active', true);  // Set the sender button to active
      }

      // Wait for unpreview button to appear in DOM and enable/disable it
      setTimeout(() => {
        const unpreviewBtn = document.querySelector('.gjs-off-prv');
        if (unpreviewBtn) {
          unpreviewBtn.addEventListener('click', () => {
            console.log('Preview stopped');
            // Disable the preview button when unpreview is clicked
            if (sender) {
              sender.set('active', false);  // Set the sender button to inactive
            }
          }, { once: true }); // Ensure it only fires once
        }
      }, 100); // Wait briefly for DOM to update
    },
    stop(editor, sender) {
      console.log('Preview stopped (from stop command)');
      // Ensure the preview button is deactivated when stopped
      if (sender) {
        sender.set('active', false);
      }
    }
  });

  return editor;
}
