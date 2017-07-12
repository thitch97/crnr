import { Injectable } from '@angular/core';

@Injectable()
export class ResultService {

	result:any;

  getResult(){

  	return this.result;
  }

  setResult(r:any){

  	this.result = r;

  }

}
