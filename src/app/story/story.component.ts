import {Component} from "@angular/core"
import {StoryService} from "services/story.service";
import {Story} from "../models/story.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "epf-majors",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent {
  public story: Story | undefined;
  public storyChoice: number | undefined;
  public textDescription: string | undefined;
  public localisation: string | undefined;
  public option1: string | undefined;
  public option2: string | undefined;
  public option3: string | undefined;
  public option4: string | undefined;

  constructor(private storyService: StoryService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.storyChoice = params['storyChoice'];
      console.log(this.storyChoice);
    });
    //TODO startStory doit pouvoir reprendre le dernier id
    this.storyService.startStory().subscribe((story: Story) => {
      // Traitez les données reçues, par exemple en les stockant dans une variable du composant
      this.story = story;
      this.updateStory();
    });

  }

  private updateStory() {
    this.textDescription = this.story?.textDescription;
    this.localisation = this.story?.localisation;
    this.option1 = this.story?.option1;
    this.option2 = this.story?.option2;
    this.option3 = this.story?.option3;
    this.option4 = this.story?.option4;
  }

  choice(choice: number) {
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
    if (this.storyChoice == undefined) {
      console.error("Pas de choix possible");
    } else if (this.storyChoice < 0) {
      let idMonstre: number = 1;
      this.storyChoice = Math.abs(this.storyChoice);
      this.router.navigate(['/fight'], { queryParams: { idMonstre: idMonstre, stroryChoice: this.storyChoice } });
    } else {
      this.storyService.storyChoice(this.storyChoice).subscribe((story: Story) => {
        this.story = story;
        this.updateStory();
        //TODO a compléter ?
      })
    }
  }
}
