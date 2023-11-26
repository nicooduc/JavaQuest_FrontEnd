import {Component} from "@angular/core"
import {FightService} from "services/fight.service";
import {Opponent} from "../models/opponent.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: "epf-majors", templateUrl: "./fight.component.html", styleUrls: ["./fight.component.scss"],
})
export class FightComponent {
  private opponents: Opponent[] | undefined;
  private monsterIndex: number | undefined;
  private heroIndex: number | undefined;
  private storyChoice: number | undefined;

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

  constructor(private fightService: FightService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let idMonster: number;
    this.route.queryParams.subscribe(params => {
      idMonster = params['idMonster'];
      this.storyChoice = params['storyChoice'];
      console.log(idMonster);
      console.log(this.storyChoice);
    });
    //TODO startCombat doit pouvoir prendre l'id du monstre
    this.fightService.startCombat().subscribe((opponents: Opponent[]) => {
      this.opponents = opponents;
      this.updateOpponentCharacteristics();
    });
  }

  public turn(action: String) {
    this.fightService.turn(action).subscribe((opponents: Opponent[]) => {
      this.opponents = opponents;
      this.updateOpponentCharacteristics();
      //TODO a compléter ?
    })
    this.checkMonsterStatus();
    this.checkHeroStatus();
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
      if (monsterState) {
        this.monsterHP = 0;
        this.fightEnd();
        this.router.navigate(['/story'], {queryParams: {stroryChoice: this.storyChoice}});
      }
    });
  }

  private checkHeroStatus() {
    this.fightService.checkOpponentStatus("Hero").subscribe((heroState: boolean) => {
      if (heroState) {
        this.heroHP = 0;
      }
      // TODO logique de mort du hero / clean la table oponnents
    });
  }

  private fightEnd() {
    this.fightService.endFight().subscribe((xpGain: number) => {
      //TODO afficher le gain d'xp / le LVL up
      if (xpGain < 0) {
        xpGain = Math.abs(xpGain);
        console.log("Level Up");
      }
      console.log(xpGain);
    })
  }
}
