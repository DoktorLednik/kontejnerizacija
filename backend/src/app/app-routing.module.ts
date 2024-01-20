import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KeyListComponent} from "./keys/key-list/key-list.component";
import {KeyCreateComponent} from "./keys/key-create/key-create.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: KeyListComponent },
  { path: 'create', component: KeyCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:keyId', component: KeyCreateComponent, canActivate: [AuthGuard]},
  { path: "auth", loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
