import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Monster } from "models/monster.model"
import { MonsterDto } from "models/dto/MonsterDto"
import { HeroDto } from "models/dto/HeroDto"
import { HttpClient } from "@angular/common/http"
import { Hero } from "../models/hero.model"

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  constructor(private http: HttpClient) {
  }

  private majorUrl = "http://localhost:8080/major"

  findAll(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.majorUrl)
  }

  findStudentsFromMonster(majorId: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.majorUrl + `/${majorId}/students`)
  }

}
