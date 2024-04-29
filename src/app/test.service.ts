// test.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private questions = new BehaviorSubject<any[]>([]);
  private filter = { year: '', topic: '', difficulty: '' };

  constructor(private http: HttpClient) { }

  applyFilter(year: string, topic: string, difficulty: string) {
    this.filter = { year, topic, difficulty };
    this.loadQuestions();
  }

  private loadQuestions() {
    this.http.get<any[]>('/assets/data/data_A1.json').pipe(
      map(questions => {
        let filteredQuestions = questions;

        if (this.filter.year) {
          filteredQuestions = filteredQuestions.filter(question => question.year === this.filter.year);
        }

        if (this.filter.topic) {
          filteredQuestions = filteredQuestions.filter(question => question.topic === this.filter.topic);
        }

        if (this.filter.difficulty) {
          filteredQuestions = filteredQuestions.filter(question => question.difficulty === this.filter.difficulty);
        }

        this.questions.next(filteredQuestions);
        return filteredQuestions;
      })
    ).subscribe();
  }

  getRandomQuestion() {
    return this.http.get<any[]>('/assets/data/data_A1.json').pipe(
      map(questions => {
        const index = Math.floor(Math.random() * questions.length);
        console.log('Pregunta seleccionada:', questions[index]);
        return questions[index];
      })
    );
  }

  getCorrectAnswers() {
    return this.http.get<any[]>('/assets/data/data_A1.json').pipe(
      map(questions => {
        return questions.map(question => question.correcta);
      })
    );
  }
}
