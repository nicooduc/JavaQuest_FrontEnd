import {Component} from "@angular/core"
import {FightService} from "services/fight.service";
import {Opponent} from "../models/opponent.model";


@Component({
  selector: "epf-majors",
  templateUrl: "./fight.component.html",
  styleUrls: ["./fight.component.scss"],
})
export class FightComponent {
  public opponents: Opponent[] | undefined;
  public monsterIndex: number | undefined;
  public heroIndex: number | undefined;
  public monsterDead: boolean = false;
  public heroDead: boolean = false;

  public monsterName: string | undefined;
  public monsterImg: string | undefined;
  public monsterHP: number | undefined;
  public monsterAtk: number | undefined;
  public monsterDef: number | undefined;
  public monsterMag: number | undefined;
  public monsterSpeed: number | undefined;

  public heroName: string | undefined;
  public heroImg: string | undefined;
  public heroHP: number | undefined;
  public heroAtk: number | undefined;
  public heroDef: number | undefined;
  public heroMag: number | undefined;
  public heroSpeed: number | undefined;

  constructor(private fightService: FightService) {
  }

  ngOnInit(): void {
    this.fightService.startCombat().subscribe((opponents: Opponent[]) => {
      this.opponents = opponents;
      this.updateOpponentCharacteristics();
    });
  }

  private updateOpponentCharacteristics(): void {
    // Récupération de l'index de chaque opposant
    this.monsterIndex = this.opponents?.findIndex(opponent => opponent.type === 'Monster');
    this.heroIndex = this.opponents?.findIndex(opponent => opponent.type === 'Hero');

    // Récupération des variables à afficher
    if (this.opponents && this.monsterIndex !== undefined && this.heroIndex !== undefined) {
      this.monsterName = this.opponents[this.monsterIndex]?.name;
      this.monsterImg = this.opponents[this.monsterIndex]?.image;
      this.monsterHP = this.opponents[this.monsterIndex]?.healthPoint;
      this.monsterAtk = this.opponents[this.monsterIndex]?.attackPoint;
      this.monsterDef = this.opponents[this.monsterIndex]?.defensePoint;
      this.monsterMag = this.opponents[this.monsterIndex]?.magicPoint;
      this.monsterSpeed = this.opponents[this.monsterIndex]?.speed;

      this.heroName = this.opponents[this.heroIndex]?.name;
      this.heroImg = this.opponents[this.heroIndex]?.image;
      this.heroHP = this.opponents[this.heroIndex]?.healthPoint;
      this.heroAtk = this.opponents[this.heroIndex]?.attackPoint;
      this.heroDef = this.opponents[this.heroIndex]?.defensePoint;
      this.heroMag = this.opponents[this.heroIndex]?.magicPoint;
      this.heroSpeed = this.opponents[this.heroIndex]?.speed;
    }

  }

  private checkMonsterStatus() {
    this.fightService.checkOpponentStatus("Monster").subscribe((monsterState: boolean) => {
      this.monsterDead = monsterState;
      if (monsterState) {
        this.monsterHP = 0; // TODO hp negatifs ?
      }
      // TODO logique de mort du monstre
    });
  }

  private checkHeroStatus() {
    this.fightService.checkOpponentStatus("Hero").subscribe((heroState: boolean) => {
      this.heroDead = heroState;
      if (heroState) {
        this.heroHP = 0; // TODO hp negatifs ?
      }
      // TODO logique de mort du hero
    });
  }

  turn(action: String) {
    this.fightService.turn(action).subscribe((opponents: Opponent[]) => {
      this.opponents = opponents;
      this.updateOpponentCharacteristics();
      this.checkMonsterStatus();
      this.checkHeroStatus();
      //TODO a compléter ?
    })
  }
}
