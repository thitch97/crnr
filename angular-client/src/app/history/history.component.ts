import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  entry: string;
  entries = {}
  constructor(private historyService: HistoryService) {}

  history() {

    this.historyService.history()
    .subscribe(data => {
      this.entry = JSON.stringify(data);
      this.entries = data;
    })
  }

}
