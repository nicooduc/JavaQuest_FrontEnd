import {Component} from "@angular/core"
import {FightService} from "services/fight.service";
import {Opponent} from "../models/opponent.model";


@Component({
  selector: "epf-majors",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent {
  // monster$: Observable<Monster[]> = this._route.data.pipe(map((data) => data["monster"]))

  //constructor(private _route: ActivatedRoute) {
  //}
  public opponents: Opponent[] | undefined;

  constructor(private fightService: FightService) {
  }

  ngOnInit(): void {
    /*this.fightService.findAll().subscribe((opponents: Opponent[]) => {
      // Traitez les données reçues, par exemple en les stockant dans une variable du composant
      this.opponents = opponents;
    });*/

    this.fightService.startCombat().subscribe((opponents: Opponent[]) => {
      // Traitez les données reçues, par exemple en les stockant dans une variable du composant
      this.opponents = opponents;
    });
  }
}
