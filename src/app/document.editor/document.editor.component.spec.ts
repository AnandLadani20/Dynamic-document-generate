import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditorComponent } from './document.editor.component';

describe('DocumentEditorComponent', () => {
  let component: DocumentEditorComponent;
  let fixture: ComponentFixture<DocumentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
