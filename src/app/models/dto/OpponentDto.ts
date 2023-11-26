import {Opponent} from "../opponent.model"

export class OpponentDto {
  opponent: Opponent

  constructor(opponent: Opponent) {
    this.opponent = opponent
  }
}
