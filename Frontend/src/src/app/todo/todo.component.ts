import { AfterViewInit, Component } from '@angular/core';
import { ToDo } from 'src/ObjectModels/ToDo';
import { DataService } from '../services/data.service';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements AfterViewInit {
  addTodoForm: boolean = false;
  description: string = "";
  title: string = "";
  toDos: ToDo[] | null = null;

  constructor(private dataService: DataService) {

  }

  addToDo() {
    if (this.toDos == null) {
      this.toDos = new Array(new ToDo(-1, this.title, this.description, false))
      console.log("jea adding 1")
    }
    else {
      console.log("hiu adding")
      this.toDos.push(new ToDo(-1, this.title, this.description, false))
    }
    this.addTodoForm = false;
    this.dataService.createTodo(this.title, this.description, false).subscribe((res) => console.log(res)) //ToDo implement Api call
  }

  getTodos() {
    this.dataService.getTodos().subscribe((res: any) => {
      // Map the received objects to ToDo objects
      this.toDos = res
    });
  }

  delTodo(_id: number) {
    //filter deleted todo outa the array
    if (this.toDos != null) {
      this.toDos = this.toDos.filter(todo => todo.id !== _id);
    }

    this.dataService.delTodos(_id).subscribe((res) => {
      console.log(res)
    })
  }

  toDoForm() {
    console.log("getting called")
    this.addTodoForm = !this.addTodoForm;
    this.description = "";
    this.title = "";
  }


  ngAfterViewInit(): void {


    interval(5000).subscribe(() => {
      this.dataService.getHumidity().subscribe(
        (res: any) => {

          this.dataService.getTodos().subscribe((res: any) => {
            this.toDos = res
          })
          console.log("Call")

        })


    });
  }

}
