import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Opponent} from "models/opponent.model"
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class FightService {
  private fightsUrl = "http://localhost:8080/fight"

  constructor(private http: HttpClient) {
  }

  startCombat(idMonster: number): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(`${this.fightsUrl}/startCombat/${idMonster}`)
  }

  turn(action: String): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(`${this.fightsUrl}/turn/${action}`)
  }

  checkOpponentStatus(type: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.fightsUrl}/check${type}Status`)
  }

  endFight(success: boolean): Observable<number> {
    return this.http.get<number>(`${this.fightsUrl}/endFight/${success}`)
  }
}

