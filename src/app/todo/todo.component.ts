import { Component, OnInit } from '@angular/core';

interface Task {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTask: string = '';
  tasks: Task[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  allTasksCompleted(): boolean {
    return this.tasks.length > 0 && this.tasks.every(task => task.completed);
  }

  hasCompletedTasks(): boolean {
    return this.tasks.some(task => task.completed);
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
