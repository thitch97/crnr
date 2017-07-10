import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ResultService } from '../result.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  term: string;
  result: string;
  results = {};

  constructor(private searchService: SearchService, private resultService: ResultService, private route:Router) {}

  search() {
    this.searchService.search(this.term.toLowerCase())
      .subscribe(data => {
        this.resultService.setResult(data);
        this.route.navigate(["../results"]);
        
     });
  }

}