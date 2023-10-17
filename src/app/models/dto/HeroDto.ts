import {Hero} from "../hero.model"

export class HeroDto {
  hero: Hero

  constructor(hero: Hero) {
    this.hero = hero
  }
}
