import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  answers: number[] = JSON.parse(localStorage.getItem('answers')) || [];
  correctAnswers: string[] = [];

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getCorrectAnswers().subscribe(correctAnswers => {
      this.correctAnswers = correctAnswers;
    });
  }
}
