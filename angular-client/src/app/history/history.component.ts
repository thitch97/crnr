import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  entry: string;
  entries = {}
  constructor(private historyService: HistoryService) {}

  ngOnInit() { this.history(); };


  history() {
    this.historyService.history()
    .subscribe(data => {
      this.entry = JSON.stringify(data);
      this.entries = data;
      console.log(data);
    })
  }
}


