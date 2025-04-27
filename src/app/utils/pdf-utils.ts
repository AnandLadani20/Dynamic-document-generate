import * as pdfjsLib from 'pdfjs-dist';
export async function convertPdfToHtml(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const img = canvas.toDataURL();
    pages.push(`
        <div class="pdf-page" style="position: relative; width: ${viewport.width}px; height: ${viewport.height}px; margin: 30px auto;">
          <img src="${img}" style="width: 100%; height: 100%; position: absolute; z-index: 0; pointer-events: none;" />
        </div>
      `);
  }

  return `<div class="pdf-document">${pages.join('')}</div>`;
}

export function replaceDynamicFields(html: string): string {
  const data: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  };
  return html.replace(
    /\{\{(.*?)\}\}/g,
    (_, key) => data[key.trim()] || `{{${key}}}`
  );
}
