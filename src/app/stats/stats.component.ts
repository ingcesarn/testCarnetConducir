import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: any = {
    numQuestions: 0,
    numCorrect: 0,
    numIncorrect: 0,
    percentage: 0
  };

  constructor() { }

  ngOnInit() {
    const answers = JSON.parse(localStorage.getItem('answers')) || [];
    this.stats.numQuestions = answers.length;
    this.stats.numCorrect = answers.filter(answer => answer === '1').length;
    this.stats.numIncorrect = answers.filter(answer => answer !== '1').length;
    this.stats.percentage = Math.round(this.stats.numCorrect / this.stats.numQuestions * 100);
  }
}
