import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoggedComponent } from "./logged.component";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./pages/home/home.component";
import { UserListComponent } from "./pages/user-list/user-list.component";

const routerConfig: Routes = [
    {
        path: '', component: LoggedComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'user', component: UserListComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
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