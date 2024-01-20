import {NgModule} from "@angular/core";

import { KeyCreateComponent} from "./key-create/key-create.component";
import { KeyListComponent} from "./key-list/key-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularMaterialModule} from "../angular-material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    KeyListComponent,
    KeyCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule //possibly unnecessary?
  ]
})
export class KeysModule {}
