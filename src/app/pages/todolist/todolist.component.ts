import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: any[] = [];
  errorMessage: string = '';

  constructor(private taskService: ShoppingService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: any[]) => this.taskArray = data,
      error: (err: { message: string; }) => this.errorMessage = err.message
    });
  }

  onSubmit(form: NgForm) {
    const newTask = {
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    };

    this.taskService.addTask(newTask).subscribe({
      next: (task: any) => {
        this.taskArray.push(task);
        form.reset();
      },
      error: (err: { message: string; }) => this.errorMessage = err.message
    });
  }

  onDelete(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.taskArray = this.taskArray.filter(task => task.id !== id);
      },
      error: (err: { message: string; }) => this.errorMessage = err.message
    });
  }

  onCheck(task: any) {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        task.isCompleted = updatedTask.isCompleted;
        this.taskArray.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
      },
      error: (err: { message: string; }) => this.errorMessage = err.message
    });
  }

  onEdit(task: any) {
    task.isEditable = true;
  }

  onSave(task: any, newTaskName: string) {
    const updatedTask = { ...task, taskName: newTaskName, isEditable: false };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        task.taskName = newTaskName;
        task.isEditable = false;
      },
      error: (err: { message: string; }) => this.errorMessage = err.message
    });
  }
}
