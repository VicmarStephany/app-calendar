import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './presentation/views/home/home.page';
import { ModalPage } from './presentation/components/modal/modal.page';
import { ModalEditPage } from './presentation/components/modal-edit/modal-edit.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',

  },
  
  {
    path: 'home',
    component: HomePage,

    children: [
      {
        path: 'modal',
        component: ModalPage
      },
      {
        path: 'modal-edit',
        component: ModalEditPage
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
