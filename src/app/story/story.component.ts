import {Component, OnInit} from "@angular/core"
import {StoryService} from "services/story.service";
import {Story} from "../models/story.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "epf-majors", templateUrl: "./story.component.html", styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit {
  public textDescription: string | undefined;
  public localisation: string | undefined;
  public option1: string | undefined;
  public option2: string | undefined;
  public option3: string | undefined;
  public option4: string | undefined;
  private story: Story | undefined;
  private storyChoice: number | undefined;

  constructor(private storyService: StoryService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.storyChoice = params['storyChoice'];
      console.log(this.storyChoice);
    });
    this.storyChoice = this.storyChoice ?? 1;
    this.storyService.startStory(this.storyChoice).subscribe((story: Story) => {
      this.story = story;
      this.updateStory();
    });

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
      this.storyChoice = Math.abs(this.storyChoice);
      this.router.navigate(['/fight'], {
        queryParams: {
          idMonster: this.story?.monsterID,
          storyChoice: this.storyChoice
        }
      });
    } else {
      this.storyService.storyChoice(this.storyChoice).subscribe((story: Story) => {
        this.story = story;
        this.updateStory();
      })
    }
  }

  private updateStory() {
    this.textDescription = this.story?.textDescription;
    this.localisation = this.story?.localisation;
    this.option1 = this.story?.option1;
    this.option2 = this.story?.option2;
    this.option3 = this.story?.option3;
    this.option4 = this.story?.option4;
  }
}
