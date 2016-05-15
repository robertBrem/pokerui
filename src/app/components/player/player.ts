import {AccountPosition} from "../accountPosition/accountPosition";

export class Player {
  id:number;
  firstName:string;
  lastName:string;
  balance:string;
  currency:string;
  accountPositions:AccountPosition[];

  constructor() {
  }

}
