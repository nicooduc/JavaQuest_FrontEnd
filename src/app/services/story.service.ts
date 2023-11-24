import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Story} from "models/story.model"
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class StoryService {
  constructor(private http: HttpClient) {
  }

  private storyUrl = "http://localhost:8080/story"

  startStory(): Observable<Story> {
    return this.http.get<Story>(`${this.storyUrl}/startStory`)
  }

  storyChoice(choice: number | undefined): Observable<Story> {
    return this.http.get<Story>(`${this.storyUrl}/story/${choice}`)
  }
}
