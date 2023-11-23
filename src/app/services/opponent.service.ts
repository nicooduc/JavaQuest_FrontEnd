/*import { Injectable } from "@angular/core"
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
}*/

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

  private opponentsUrl = "http://localhost:8080/opponent"

  findAll(): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(this.opponentsUrl)
  }

  startCombat(): Observable<Opponent[]>{
    return this.http.get<Opponent[]>(`${this.opponentsUrl}/startCombat`)
  }
  attack(): Observable<Opponent[]>{
    return this.http.get<Opponent[]>(`${this.opponentsUrl}/attack`)
  }
  findById(id: number): Observable<Opponent> {
    return this.http.get<Opponent>(`${this.opponentsUrl}/${id}`)
  }

  update(id: number, opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(`${this.opponentsUrl}/${id}`, opponent)
  }

  create(opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(this.opponentsUrl, opponent)
  }

  delete(opponent: Opponent) {
    return this.http.delete(`${this.opponentsUrl}/${opponent.id}`)
  }


}

