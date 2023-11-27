import {Component, OnInit} from "@angular/core"
import {FightService} from "services/fight.service";
import {Opponent} from "../models/opponent.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: "epf-majors", templateUrl: "./fight.component.html", styleUrls: ["./fight.component.scss"],
})
export class FightComponent implements OnInit {
    // Déclaration des variables pour stocker les informations du combat
    public xpGain: number = 0;
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
    public actionImg: string | undefined = "crusader.sprite.attack_banner.png";
    // Variables privées
    private opponents: Opponent[] | undefined;
    private monsterIndex: number | undefined;
    private heroIndex: number | undefined;
    private storyChoice: number | undefined;

    constructor(private fightService: FightService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // Initialisation du combat lors du chargement du composant
        // Récupération des paramètres de l'URL
        let idMonster: number = 1;
        this.route.queryParams.subscribe(params => {
            idMonster = params['idMonster'];
            this.storyChoice = params['storyChoice'];
        });
        // Appel au service pour commencer le combat
        this.fightService.startCombat(idMonster).subscribe((opponents: Opponent[]) => {
            this.opponents = opponents;
            this.updateOpponentCharacteristics();
        });
    }

    // Méthode appelée lorsqu'un tour d'action est effectué
    public turn(action: String) {
        // Mise à jour de l'image d'action en fonction de l'action choisie
        switch (action) {
            case "attack":
                this.actionImg = "crusader.sprite.attack_sword.png";
                break;
            case "defend":
                this.actionImg = "crusader.sprite.defend.png";
                break;
            case "castMagic":
                this.actionImg = "crusader.sprite.attack_scroll.png";
                break;
        }
        // Appel au service pour effectuer le tour d'action
        this.fightService.turn(action).subscribe((opponents: Opponent[]) => {
            this.opponents = opponents;
            this.updateOpponentCharacteristics();
        })
        // Vérification de l'état du monstre et du héros après le tour
        this.checkMonsterStatus();
        this.checkHeroStatus();
    }

    // Méthode pour mettre à jour les caractéristiques des adversaires
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

    // Méthodes pour vérifier l'état du monstre et du héros
    private checkMonsterStatus() {
        this.fightService.checkOpponentStatus("Monster").subscribe((monsterState: boolean) => {
            if (monsterState) {
                this.monsterHP = 0;
                this.fightEnd(true);
            }
        });
    }

    private checkHeroStatus() {
        this.fightService.checkOpponentStatus("Hero").subscribe((heroState: boolean) => {
            if (heroState) {
                this.heroHP = 0;
                this.fightEnd(false);
            }
        });
    }

    // Méthode appelée à la fin du combat
    private fightEnd(success: boolean) {
        this.fightService.endFight(success).subscribe((xpGain: number) => {
            if (success) {
                if (xpGain < 0) {
                    this.xpGain = Math.abs(xpGain);
                    const lvlUpMessage = document.getElementById('lvl-up-message');
                    const closeLvlUpMessage = document.getElementById('close-lvl-up-message');

                    if (lvlUpMessage && closeLvlUpMessage) {
                        lvlUpMessage.style.display = 'block';
                        closeLvlUpMessage.addEventListener('click', () => {
                            lvlUpMessage.style.display = 'none';
                            this.router.navigate(['/story'], {queryParams: {storyChoice: this.storyChoice}});
                        });
                    }
                } else {
                    this.xpGain = xpGain;
                    const gainXPMessage = document.getElementById('gain-xp-message');
                    const closeGainXPMessage = document.getElementById('close-gain-xp-message');

                    if (gainXPMessage && closeGainXPMessage) {
                        gainXPMessage.style.display = 'block';
                        closeGainXPMessage.addEventListener('click', () => {
                            gainXPMessage.style.display = 'none';
                            this.router.navigate(['/story'], {queryParams: {storyChoice: this.storyChoice}});
                        });
                    }
                }
            } else {
                const deathMessage = document.getElementById('death-message');
                const closedeathMessage = document.getElementById('close-death-message');

                if (deathMessage && closedeathMessage) {
                    deathMessage.style.display = 'block';
                    closedeathMessage.addEventListener('click', () => {
                        deathMessage.style.display = 'none';
                        this.router.navigate(['/story'], {queryParams: {storyChoice: 99}}); //TODO remplacer 99 par l'id de story de mort
                    });
                }
            }
        })
    }
}
