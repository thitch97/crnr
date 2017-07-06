import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';


@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [SearchService]
})

export class ResultComponent implements OnInit {

 
  result: string;
  results = {};

  @Input() term: string;


  ngOnInit() { this.search(); };
  

  constructor(private searchService: SearchService) {}

  search() {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
        this.results = data;
        console.log(this.term);
      });
  }
}