import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {StoryComponent} from "story/story.component"
import {HomeComponent} from "home/home.component"
import {FightComponent} from "./fight/fight.component";
//import { FightResolver } from "fight/fight.resolver"

const routes: Routes = [{path: "", component: HomeComponent}, {
  path: 'fight', component: FightComponent, //resolve: {
  //majors: FightResolver,
  //},
}, {path: 'story', component: StoryComponent},]

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule],
})
export class AppRoutingModule {
}
