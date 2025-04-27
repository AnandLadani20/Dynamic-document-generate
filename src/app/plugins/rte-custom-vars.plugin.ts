export function registerRteCustomVars(editor: any) {
    editor.RichTextEditor.add('custom-vars', {
        icon: `<select class="gjs-field"><option value="">- Select -</option><option value="{{firstName}}">FirstName</option><option value="{{lastName}}">LastName</option></select>`,
        event: 'change',
        result: (rte: any, action: any) => rte.insertHTML((action.btn?.firstChild as HTMLSelectElement)?.value || ''),
        update: (rte: any, action: any) => {
          const el = action.btn?.firstChild as HTMLSelectElement;
          if (el) el.value = '';
          return 0;
        }
      });
}