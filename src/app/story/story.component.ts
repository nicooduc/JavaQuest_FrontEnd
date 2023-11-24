import {Component} from "@angular/core"
import {StoryService} from "services/story.service";
import {Opponent} from "../models/opponent.model";
import {Story} from "../models/story.model";


@Component({
  selector: "epf-majors",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent {
  public story: Story | undefined;
  public textDescription: string | undefined;
  public localisation: string | undefined;
  public option1: string | undefined;
  public option2: string | undefined;
  public option3: string | undefined;
  public option4: string | undefined;

  constructor(private storyService: StoryService) {
  }

  ngOnInit(): void {
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
    let storyChoice: number | undefined;
    switch (choice) {
      case 1:
        storyChoice = this.story?.redirection1;
        break;
      case 2:
        storyChoice = this.story?.redirection2;
        break;
      case 3:
        storyChoice = this.story?.redirection3;
        break;
      case 4:
        storyChoice = this.story?.redirection4;
        break;
    }
    this.storyService.storyChoice(storyChoice).subscribe((story: Story) => {
      this.story = story;
      this.updateStory();
      //TODO a compléter ?
    })
  }


}
