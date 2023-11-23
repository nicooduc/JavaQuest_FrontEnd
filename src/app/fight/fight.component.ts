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
  public opponents: Opponent[] | undefined;
  public monsterName: string | undefined;
  public monsterHP: number | undefined;
  public monsterDef: number | undefined;
  public heroAtk: number | undefined;
  public monster: number | null = null;
  public hero: number | 0;
  constructor(private opponentService: OpponentService) {
    this.hero = 0;
    this.monster = 0;
  }
  ngOnInit(): void {
    this.opponentService.startCombat().subscribe((opponents: Opponent[]) => {
      this.opponents = opponents;
      if (opponents[0].type == "hero") {
        this.hero = 0;
        this.monster = 1;
      } else {
        this.hero = 1;
        this.monster = 0;
      }
      this.monsterName = opponents[this.monster].name;
      this.monsterHP = opponents[this.monster].healthPoint;
      this.monsterDef = opponents[this.monster].defensePoint;
      this.heroAtk = opponents[this.hero].attackPoint;
    });

  }

  attaquer() {
    const currentMonsterIndex = this.opponents?.findIndex(opponent => opponent.type === 'monster');
    if (currentMonsterIndex !== -1 && this.opponents) {
      this.monster = currentMonsterIndex ?? null;
      this.opponentService.attack().subscribe((opponents: Opponent[]) => {
        this.opponents = opponents;
        this.monsterHP = this.opponents[this.monster ?? 0]?.healthPoint;
      });
    }
  }

  defendre() {

  }

  lancerMagie() {

  }
}
