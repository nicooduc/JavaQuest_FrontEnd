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

  endFight(): Observable<number> {
    return this.http.get<number>(`${this.fightsUrl}/endFight`)
  }


  // TODO supprimer les lignes suivantes après s'en être inspiré
  findById(id: number): Observable<Opponent> {
    return this.http.get<Opponent>(`${this.fightsUrl}/${id}`)
  }

  update(id: number, opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(`${this.fightsUrl}/${id}`, opponent)
  }

  create(opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(this.fightsUrl, opponent)
  }
}

