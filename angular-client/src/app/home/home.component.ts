import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  term: string;
  result: string;
  results = {};

  constructor(private searchService: SearchService) {}

  search() {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
        this.results = data;
      });
  }

}