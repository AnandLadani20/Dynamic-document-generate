import { Routes } from '@angular/router';
import { DocumentEditorComponent } from './document.editor/document.editor.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'document',
    component: DocumentEditorComponent
  },
  { path: '**', component: NotfoundComponent }
];
