import { Component } from '@angular/core';
import { SearchService } from './search.service';
import {MdMenuModule} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


/*export class jResult
  title:string;
  url:string;

}*/

export class AppComponent {
  term: string;
  result: string;
  results = {};





  constructor(private searchService: SearchService) {}

  search() {


    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
        this.results = data;
        console.log(this.results[0].title);

      });
  }
}
