import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Hero } from "models/hero.model"
import { Opponent } from "models/opponent.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class HeroService {
  constructor(private http: HttpClient) {
  }

  private studentsUrl = "http://localhost:8080/students"

  findAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.studentsUrl)
  }

  findById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.studentsUrl}/${id}`)
  }

  update(id: number, student: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.studentsUrl}/${id}`, student)
  }

  create(student: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.studentsUrl, student)
  }

  delete(student: Hero) {
    return this.http.delete(`${this.studentsUrl}/${student.id}`)
  }

}
