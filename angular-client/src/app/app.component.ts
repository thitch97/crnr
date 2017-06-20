import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


/*export class jResult{

  title:string;
  url:string;

}*/

export class AppComponent {
  term: string;
  result: string;
  //results:jResult[];





  constructor(private searchService: SearchService) {}

  search() {

    console.log("The term is: " + this.term);
    console.log("The result is: " + this.result);

    console.log(this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
        //this.results[0] = data;
        //console.log(this.results);
      }));
  }
}
