import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { MonsterService } from "services/monster.service"
import { Monster } from "models/monster.model"

@Injectable({
  providedIn: "root",
})
export class FightResolver implements Resolve<Monster[]> {
  constructor(private monsterService: MonsterService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Monster[]> {
    return this.monsterService.findAll()
  }
}
