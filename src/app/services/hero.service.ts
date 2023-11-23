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

  private heroUrl = "http://localhost:8080/hero"

  findAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl)
  }

  findById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroUrl}/${id}`)
  }

  update(id: number, student: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroUrl}/${id}`, student)
  }

  create(student: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, student)
  }

  delete(student: Hero) {
    return this.http.delete(`${this.heroUrl}/${student.id}`)
  }

}
