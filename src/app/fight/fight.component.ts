import { Component } from "@angular/core"
import { map, Observable } from "rxjs"
import { Monster } from "models/monster.model"
import { ActivatedRoute } from "@angular/router"
import { OpponentService } from "services/opponent.service";
import {Opponent} from "../models/opponent.model";


@Component({
  selector: "epf-majors",
  templateUrl: "./fight.component.html",
  styleUrls: ["./fight.component.scss"],
})
export class FightComponent {
 // monster$: Observable<Monster[]> = this._route.data.pipe(map((data) => data["monster"]))

  //constructor(private _route: ActivatedRoute) {
  //}
  private opponents: Opponent[] | undefined;
  constructor(private opponentService: OpponentService) { }
  ngOnInit(): void {
    this.opponentService.findAll().subscribe((opponents: Opponent[]) => {
      // Traitez les données reçues, par exemple en les stockant dans une variable du composant
      this.opponents = opponents;
    });
  }

}
