import {Story} from "../story.model"

export class StoryDto {
  story: Story

  constructor(story: Story) {
    this.story = story
  }
}
