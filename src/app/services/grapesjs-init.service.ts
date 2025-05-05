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
  editor.on('load', () => {

    const blockManager = editor.BlockManager;

    // Modify the default "text" block
    // const textBlock = blockManager.get('text');
    // if (textBlock) {
    //   const originalContent = textBlock.get('content');
    //   if (typeof originalContent === 'object' && originalContent !== null) {
    //     textBlock.set('content', {
    //       ...originalContent,
    //       resizable: { tl: true, tr: true, bl: true, br: true, tc: true, bc: true, cl: true, cr: true },
    //       dmode: 'absolute',
    //     });
    //   }
    // }

    const textBlock = blockManager.get('text');
if (textBlock) {
  const originalContent = textBlock.get('content');
  if (typeof originalContent === 'object' && originalContent !== null) {
    textBlock.set('content', {
      ...originalContent,
      resizable: { tl: true, tr: true, bl: true, br: true, tc: true, bc: true, cl: true, cr: true },
      dmode: 'absolute',
      style: {
        'font-size': '16px',
        padding: '10px'
      }
    });
  }
}

    
  
    // Modify the default "image" block
    const imageBlock = blockManager.get('image');
    if (imageBlock) {
      const originalContent = imageBlock.get('content');
      if (typeof originalContent === 'object' && originalContent !== null) {
        imageBlock.set('content', {
          ...originalContent,
          dmode: 'absolute',
        });
      }
    }
    
    const canvasBody = editor.Canvas.getDocument().body;
  
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.id = 'canvas-content-wrapper';
    wrapper.style.position = 'relative';
    wrapper.style.margin = '20px auto';
    // wrapper.style.padding = '20px';
    wrapper.style.maxWidth = '900px';
    wrapper.style.minHeight = '1200px';
    wrapper.style.background = '#fff';
    wrapper.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    wrapper.style.border = '1px solid transparent';
  
    // Move all current body children into wrapper
    while (canvasBody.firstChild) {
      wrapper.appendChild(canvasBody.firstChild);
    }
    canvasBody.appendChild(wrapper);
  
    // Set outer frame background
    const canvasWrapper = editor.Canvas.getFrameEl()?.parentElement;
    if (canvasWrapper) {
      canvasWrapper.style.backgroundColor = '#f0f0f0';
      canvasWrapper.style.padding = '20px';
    }
  });

  // Disable selection and styling for <body>
  const wrapper = editor.getWrapper();
  wrapper?.set({ selectable: false, highlightable: false, hoverable: false, draggable: false, removable: false, copyable: false });
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

  editor.DomComponents.addType('page', {
    model: {
      defaults: {
        tagName: 'div',
        classes: ['gjs-page'],
        traits: [],
        draggable: false,
        droppable: true,
        stylable: true,
        style: {
          padding: '20px',
          'min-height': '1123px', // A4 height @ 96dpi approx
          'border': '1px solid #ccc',
          'margin-bottom': '20px',
          'background-color': '#f8f8f8',
          'page-break-after': 'always'
        }
      }
    }
  });
  editor.Commands.add('add-new-page', {
    run(editor) {
      editor.addComponents({
        type: 'page',
        content: '<p>New Page</p>'
      });
    }
  });
  
  editor.Commands.add('delete-selected-page', {
    run(editor) {
      const selected = editor.getSelected();
      if (selected && selected.get('type') === 'page') {
        selected.remove();
      } else {
        alert('Please select a page to delete.');
      }
    }
  });
  

  return editor;
}
