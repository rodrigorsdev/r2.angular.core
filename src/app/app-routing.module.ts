import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'an/login',
    pathMatch: 'full'
  },
  {
    path: 'an',
    loadChildren: () =>
      import('./modules/anonymous/anonymous.module')
        .then(a => a.AnonymousModule)
  },
  {
    path: 'logged',
    loadChildren: () =>
      import('./modules/logged/logged.module')
        .then(a => a.LoggedModule)
  },
  {
    path: '**',
    redirectTo: 'an/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
