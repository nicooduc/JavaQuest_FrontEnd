import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"

import {AppRoutingModule} from "app-routing.module"
import {AppComponent} from "app.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {NavbarComponent} from "navbar/navbar.component"
import {MatListModule} from "@angular/material/list"
import {HomeComponent} from "home/home.component"
import {FormsModule} from "@angular/forms"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import {StoryComponent} from "story/story.component"
import {FightComponent} from "fight/fight.component"
import {HttpClientModule} from "@angular/common/http"
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, StoryComponent, FightComponent,],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatListModule, FormsModule, MatIconModule, MatButtonModule, HttpClientModule, NgOptimizedImage,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
