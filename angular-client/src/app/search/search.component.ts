import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

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
