import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../shared/data-access/todo.service';
import { Todo } from '../shared/interfaces/todo';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  template: ` @if (todo(); as todo) {
    <h2>{{todo.title}}</h2>
    <p>{{todo.description}}</p>
  } @else {
    <p>Could not find todo...</p>
  } `,
  styles: ``
})
export default class DetailComponent {

  private route = inject(ActivatedRoute)
  private todoService = inject(TodoService);

  private paramMap = toSignal(this.route .paramMap);

  todo = computed(() => 
    this.todoService
    .todos()
    .find((todo: Todo) => todo.id === this.paramMap()?.get('id')))
}
