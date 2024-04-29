import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  year: string;
  topic: string;
  difficulty: string;

  constructor(private testService: TestService) { }

  ngOnInit() {
  }

  applyFilter() {
    this.testService.applyFilter(this.year, this.topic, this.difficulty);
  }
}
