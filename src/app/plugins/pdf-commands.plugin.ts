import { convertPdfToHtml, replaceDynamicFields } from '../utils/pdf-utils';

export function registerPdfCommands(editor: any) {
    editor.Commands.add('upload-pdf-command', {
        run(editor: any) {
          const html = `
            <div style="padding: 1rem;">
              <input type="file" id="pdf-upload" accept="application/pdf" />
            </div>
          `;
          editor.Modal.setTitle('Upload PDF').setContent(html).open();
  
          setTimeout(() => {
            document.getElementById('pdf-upload')?.addEventListener('change', async (event: any) => {
              const file = event.target.files[0];
              if (file?.type === 'application/pdf') {
                const htmlContent = await convertPdfToHtml(file);
                editor.setComponents(htmlContent);
                editor.Modal.close();
              } else {
                alert('Please upload a valid PDF file.');
              }
            });
          }, 100);
        }
      });
      editor.Commands.add('preview-pdf', {
        run(editor: any) {
          let html = editor.getHtml();
          const css = editor.getCss();
          html = replaceDynamicFields(html);
          const win = window.open('', '_blank');
          win?.document.write(`<html><head><style>${css}</style></head><body>${html}</body></html>`);
          win?.document.close();
        }
      });
      editor.Commands.add('download-pdf', {
        run(editor: any) {
          const html = editor.getHtml();
          const css = editor.getCss();
          const win = window.open('', '_blank');
          win?.document.write(`<html><head><style>${css}</style></head><body onload="window.print();">${html}</body></html>`);
          win?.document.close();
        }
      });
}
