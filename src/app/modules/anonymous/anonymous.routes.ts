import { RouterModule, Routes } from "@angular/router";
import { AnonymousComponent } from "./anonymous.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

const routerConfig: Routes = [
    {
        path: '', component: AnonymousComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class AnonymousRoutesModule { }