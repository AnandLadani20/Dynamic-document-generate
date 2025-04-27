import { ComponentModel, DomComponents } from 'grapesjs';

export function registerFillableFields(editor: any) {
  const domc = editor.DomComponents;

  // 1. Define Fillable Fields
  const fields = [
    { id: 'fillable-text', label: 'Text Field', type: 'text' },
    { id: 'fillable-signature', label: 'Signature Field', type: 'signature' },
    { id: 'fillable-date', label: 'Date Field', type: 'date' }
  ];

  fields.forEach(field => {
    editor.BlockManager.add(field.id, {
      label: field.label,
      category: 'Fillable Fields',
      content: {
        type: 'fillable-field',
        attributes: {
          'data-field-type': field.type
        },
      }
    });
  });

  // 2. Add Fillable Field Component Type
  domc.addType('fillable-field', {
    isComponent: (el: HTMLElement) => {
      return el.hasAttribute?.('data-field-type');
    },
    model: {
      defaults: {
        tagName: 'div',
        attributes: {
          'data-field-type': 'text',  // <-- field type is fixed in HTML attribute only
        },
        droppable: false,
        editable: false,
        stylable: true,
        resizable: true,
        traits: [
          { type: 'text', label: 'Placeholder', name: 'placeholder', placeholder: 'Enter placeholder text' },
          { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter name' },
          { type: 'text', label: 'ID', name: 'id', placeholder: 'Enter id' }
        ],
        placeholder: 'Enter value',
        name: '',
        id: '',
        styles: `
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          min-width: 150px;
          background: #e8f5e9;
          border: 2px dashed #4caf50;
          font-size: 14px;
          color: #555;
          cursor: pointer;
        `,
      },

      // Initialize method should use correct context
      init() {
        // Listen to changes in the 'placeholder' attribute and update content
        this.on('change:placeholder', this.updatePlaceholder);
      },

      updatePlaceholder() {
        // Correctly get and set the placeholder value
        const ph = this.get('placeholder') || 'Enter value';
        this.set('content', ph);
      }
    },

    view: {
      // Directly define the render function in the view (no need to extend default view)
      initialize() {
        this.listenTo(this.model, 'change:placeholder', this.render);
      },
      
      render() {
        // Dynamically update the component's inner HTML with placeholder text
        const content = this.model.get('placeholder') || 'Enter value';
        this.el.innerHTML = content;
        return this;
      }
    }
  });
}
