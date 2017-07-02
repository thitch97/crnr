import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { SearchService } from '../search.service'
=======
import {SearchService} from '../search.service';

>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
<<<<<<< HEAD

export class SearchComponent {
  term: string;
  result: string;
=======
export class SearchComponent {

  term: string;
  result: string;
  results = {};
>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90

  constructor(private searchService: SearchService) {}

  search() {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
<<<<<<< HEAD
      });
  }

=======
        this.results = data;
      });
  }


>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90
}
