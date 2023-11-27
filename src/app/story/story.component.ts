import {Component, OnInit} from "@angular/core";
import {StoryService} from "services/story.service";
import {Story} from "../models/story.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "epf-majors", templateUrl: "./story.component.html", styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit {
    // Variables pour stocker les détails de l'histoire
    public textDescription: string | undefined;
    public localisation: string | undefined;
    public option1: string | undefined;
    public option2: string | undefined;
    public option3: string | undefined;
    public option4: string | undefined;
    public storyImg: string | undefined;

    // Variable pour stocker l'objet Story récupéré du service
    private story: Story | undefined;

    // Variable pour stocker le choix d'histoire
    private storyChoice: number | undefined;

    constructor(private storyService: StoryService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // Récupération du choix d'histoire depuis les paramètres de l'URL
        this.route.queryParams.subscribe((params) => {
            this.storyChoice = params["storyChoice"];
            console.log("Appel route : " + this.storyChoice);
        });

        // Si storyChoice est null, affecte une valeur par défaut de 1
        this.storyChoice = this.storyChoice ?? 1;
        console.log("Final choice : " + this.storyChoice);

        // Appel du service pour démarrer l'histoire en fonction du choix
        this.storyService.startStory(this.storyChoice).subscribe((story: Story) => {
            this.story = story;
            this.updateStory();
        });
    }

    // Méthode appelée lorsqu'un choix est fait
    choice(choice: number) {
        // Switch pour déterminer le choix spécifique fait par l'utilisateur
        switch (choice) {
            case 1:
                this.storyChoice = this.story?.redirection1;
                break;
            case 2:
                this.storyChoice = this.story?.redirection2;
                break;
            case 3:
                this.storyChoice = this.story?.redirection3;
                break;
            case 4:
                this.storyChoice = this.story?.redirection4;
                break;
        }

        // Gestion des cas spéciaux de choix
        if (this.storyChoice == undefined) {
            console.error("Pas de choix possible");
        } else if (this.storyChoice < 0) {
            // Redirection vers le combat en passant l'ID du monstre
            this.storyChoice = Math.abs(this.storyChoice);
            this.router.navigate(['/fight'], {
                queryParams: {
                    idMonster: this.story?.monsterID, storyChoice: this.storyChoice,
                },
            });
        } else {
            // Appel du service pour récupérer la suite de l'histoire
            this.storyService.storyChoice(this.storyChoice).subscribe((story: Story) => {
                this.story = story;
                this.updateStory();
            });
        }
    }

    // Méthode privée pour mettre à jour les détails de l'histoire
    private updateStory() {
        this.textDescription = this.story?.textDescription;
        this.localisation = this.story?.localisation;
        this.option1 = this.story?.option1;
        this.option2 = this.story?.option2;
        this.option3 = this.story?.option3;
        this.option4 = this.story?.option4;
        this.storyImg = this.story?.image;
    }
}
