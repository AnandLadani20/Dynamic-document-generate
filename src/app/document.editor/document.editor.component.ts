import { Component, AfterViewInit } from '@angular/core';
import grapesjs from 'grapesjs';
import * as pdfjsLib from 'pdfjs-dist';
import { registerFillableFields } from '../plugins/fillable-fields.plugin';
import { initGrapesJs } from '../services/grapesjs-init.service';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document.editor.component.html',
  styleUrls: ['./document.editor.component.scss']
})
export class DocumentEditorComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

    const editor = initGrapesJs('#gjs'); // Initialize GrapesJS editor

    // Add panels and commands
    editor.Panels.addPanel({ id: 'panel-top', el: '.panel__top' });

    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        { id: 'upload-pdf', label: 'Upload PDF', command: 'upload-pdf-command', className: 'btn-upload-pdf' },
        { id: 'preview-pdf', label: 'Preview PDF', command: 'preview-pdf', className: 'btn-preview-pdf' },
        { id: 'download-pdf', label: 'Download PDF', command: 'download-pdf', className: 'btn-download-pdf' }
      ]
    });

    // Register custom plugins
    registerFillableFields(editor);

    // Handle sidebar logic for fillable fields
    const sidebar = document.getElementById('fillable-sidebar')!;
    const placeholderInput = document.getElementById('placeholder-input') as HTMLInputElement;
    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const idInput = document.getElementById('id-input') as HTMLInputElement;
    const closeBtn = document.getElementById('close-sidebar')!;

    let selectedComponent: any = null;

    editor.on('component:selected', (component) => {
      if (component && component.get('type') === 'fillable-field') {
        selectedComponent = component;
        sidebar.style.display = 'block';

        // Set input values
        placeholderInput.value = component.get('placeholder') || '';
        nameInput.value = component.getAttributes()['name'] || '';
        idInput.value = component.getAttributes()['id'] || '';
      } else {
        sidebar.style.display = 'none';
        selectedComponent = null;
      }
    });

    // Handle input changes
    placeholderInput.addEventListener('input', (e) => {
      if (selectedComponent) {
        selectedComponent.set('placeholder', (e.target as HTMLInputElement).value);
        selectedComponent.view.render(); // re-render
      }
    });

    nameInput.addEventListener('input', (e) => {
      if (selectedComponent) {
        selectedComponent.addAttributes({ name: (e.target as HTMLInputElement).value });
      }
    });

    idInput.addEventListener('input', (e) => {
      if (selectedComponent) {
        selectedComponent.addAttributes({ id: (e.target as HTMLInputElement).value });
      }
    });

    // Handle Close Button
    closeBtn.addEventListener('click', () => {
      sidebar.style.display = 'none';
      editor.select(undefined); // unselect component
    });
  }
}
