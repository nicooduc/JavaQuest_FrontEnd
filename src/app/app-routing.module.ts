import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { FightComponent } from "fight/fight.component"
import { HomeComponent } from "home/home.component"
import { FightResolver } from "fight/fight.resolver"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'fight', component: FightComponent,
    // resolve: {
    //   majors: FightResolver,
    // },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
