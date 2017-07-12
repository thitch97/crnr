import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';
import { ResultService } from '../result.service';



@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [SearchService]
})

export class ResultComponent implements OnInit {

  term:string;
  result: string;
  results = {};

  ngOnInit() { this.results = this.resultService.getResult() };
  

  constructor(private resultService: ResultService) {}

  prepareURL(link:string){
  	return link.slice(2).replace(/_/g,'/');
  }

}