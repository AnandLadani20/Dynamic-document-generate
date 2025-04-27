export function registerFillableFields(editor: any) {
    const fields = [
        { id: 'fillable-text', label: 'Text Field', type: 'text', content: 'Text Field' },
        { id: 'fillable-signature', label: 'Signature Field', type: 'signature', content: 'Signature' },
        { id: 'fillable-date', label: 'Date Field', type: 'date', content: 'Date' }
      ];
    fields.forEach(field => {
      editor.BlockManager.add(field.id, {
        label: field.label,
        category: 'Fillable Fields',
        content: {
          type: 'fillable-field',
          attributes: { 'data-field-type': field.type },
          content: field.content,
          style: {
            padding: '5px',
            fontSize: '14px',
            border: '1px dashed #999',
            backgroundColor: '#fff',
            display: 'inline-block',
          }
        }
      });
    });
  
    editor.DomComponents.addType('fillable-field', {
        isComponent: (el: HTMLElement) => el.hasAttribute?.('data-field-type'),
        model: {
          defaults: {
            tagName: 'div',
            droppable: false,
            editable: true,
            stylable: true,
            attributes: { 'data-field-type': 'text' },
            resizable: { tl: true, tr: true, bl: true, br: true, tc: true, bc: true, cl: true, cr: true },
            dmode: 'absolute'
          }
        }
      });
  }
  