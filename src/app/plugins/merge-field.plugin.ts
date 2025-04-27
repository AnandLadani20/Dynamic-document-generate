export function registerMergeFieldCommands(editor: any) {
    editor.Commands.add('show-merge-field-dropdown', {
        run(editor: any) {
          const mergeFields = ['firstName', 'lastName', 'email'];
          const dropdownHtml = `
            <div style="padding: 1rem;">
              <label for="merge-field-select">Select Merge Field:</label>
              <select id="merge-field-select" style="width: 100%; margin-top: 10px;">
                <option value="">-- Select --</option>
                ${mergeFields.map(f => `<option value="{{${f}}}">${f}</option>`).join('')}
              </select>
            </div>
          `;
          editor.Modal.setTitle('Insert Merge Field').setContent(dropdownHtml).open();
  
          setTimeout(() => {
            const select = document.getElementById('merge-field-select') as HTMLSelectElement;
            select?.addEventListener('change', (event: Event) => {
                const value = (event.target as HTMLSelectElement).value;
                if (value) {
                  const selected = editor.getSelected();
                  console.log('selected', selected);
              
                  if (selected && (selected.is('text') || selected.get('editable'))) {
                    const child = selected.components()?.at(0); // Get inner text node
                    if (child) {
                      const oldText = child.get('content') || '';
                      child.set('content', oldText + ' ' + value);
              
                      // Force re-rendering
                      selected.view.render(); // <--- this is critical
                      
                    } else {
                      alert('Please select a text block that has editable text.');
                    }
                  } else {
                    alert('Please select a text block to insert into.');
                  }
              
                  editor.Modal.close();
                }
              });
              
              
          }, 100);
          
        }
      });
}