import {Monster} from "../monster.model"

export class MonsterDto {
  monster: Monster

  constructor(monster: Monster) {
    this.monster = monster
  }
}
