import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Opponent } from "models/opponent.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class OpponentService {
  constructor(private http: HttpClient) {
  }

  private coursesUrl = "http://localhost:8080/courses"

  findAll(): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(this.coursesUrl)
  }
}
