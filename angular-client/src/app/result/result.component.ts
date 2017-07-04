import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent {
  term: string;
  result: string;

  constructor(private searchService: SearchService) {}

  search(event) {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
      });
  }
}