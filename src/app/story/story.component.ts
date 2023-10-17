import { Component } from "@angular/core"
import { map, Observable } from "rxjs"
import { Monster } from "models/monster.model"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "epf-majors",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent {
  monster$: Observable<Monster[]> = this._route.data.pipe(map((data) => data["monster"]))

  constructor(private _route: ActivatedRoute) {
  }
}
