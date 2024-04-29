// test.component.ts

import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  totalQuestions: number = 30;
  currentQuestionIndex: number = 0;
  currentQuestion: any = {};
  selectedAnswer: number;
  answers: number[] = [];
  questionStatus: boolean[] = [];
  finalMessage: string = '';

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.questionStatus = [];
    for (let i = 0; i < this.totalQuestions; i++) {
      this.questionStatus.push(false);
    }
    this.getRandomQuestion();
  }

//  ngOnInit() {
//    this.questionStatus = Array(this.totalQuestions).fill(false);
//    this.getRandomQuestion();
//  }

  getRandomQuestion() {
    this.testService.getRandomQuestion().subscribe(question => {
      this.currentQuestion = {
        pregunta: question.pregunta,
        img: question.img,
        a: question['a.'],
        b: question['b.'],
        c: question['c.']
      };
      this.questionStatus[this.currentQuestionIndex] = true;
    });
  }

  onSubmit() {
    this.answers.push(this.selectedAnswer);
    this.selectedAnswer = null;
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.getRandomQuestion();
    } else {
      this.finalMessage = 'Has completado el test. Gracias por participar.';
    }
  }
}
