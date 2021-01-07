import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { ApiService } from './service/api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'interview-test-q2';
  categories = []
  categories$ = new BehaviorSubject<string[]>([]);
  filter = '';
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getData().subscribe(res => {
      this.categories = res;
      this.categories$.next(this.categories);
    })
  }

  filterChange() {
    const regex = new RegExp(this.filter, 'i');
    this.categories$.next(this.categories.filter(el => regex.test(el)))
  }
}
