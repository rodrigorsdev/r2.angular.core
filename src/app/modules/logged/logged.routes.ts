import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoggedComponent } from "./logged.component";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./pages/home/home.component";

const routerConfig: Routes = [
    {
        path: '', component: LoggedComponent,
        children: [
            { path: 'home', component: HomeComponent },
        ],
        canActivate: [
            AuthGuard,
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class LoggedRoutesModule { }