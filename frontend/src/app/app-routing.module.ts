import { NgModule } from "@angular/core";
import { RouterModule,Routes} from "@angular/router";
import { LoginComponent } from "./auth/login/login/login.component";
import { GameCreateComponent } from "./game/game-create/game-create.component";
import { GameDisplayComponent } from "./game/game-display/game-display.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'add', component: GameCreateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: LoginComponent },
    { path: 'display', component: GameDisplayComponent },

  ];
  
@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}