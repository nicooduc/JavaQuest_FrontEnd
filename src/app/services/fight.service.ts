import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Opponent} from "models/opponent.model"
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class FightService {
  constructor(private http: HttpClient) {
  }

  private opponentsUrl = "http://localhost:8080/fight"

  startCombat(): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(`${this.opponentsUrl}/startCombat`)
  }

  checkOpponentStatus(type: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.opponentsUrl}/check${type}Status`);
  }

  turn(action: String): Observable<Opponent[]> {
    return this.http.get<Opponent[]>(`${this.opponentsUrl}/turn/${action}`)
  }


  // TODO supprimer les lignes suivantes après s'en être inspiré
  findById(id: number): Observable<Opponent> {
    return this.http.get<Opponent>(`${this.opponentsUrl}/${id}`)
  }

  update(id: number, opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(`${this.opponentsUrl}/${id}`, opponent)
  }

  create(opponent: Opponent): Observable<Opponent> {
    return this.http.post<Opponent>(this.opponentsUrl, opponent)
  }
}

