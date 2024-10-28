import { AfterViewInit, Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterViewInit {

  constructor(public dataService:DataService){

  }
  moreOptions:boolean = false;


  cardClick(){
    this.moreOptions = !this.moreOptions;
  }
  ngAfterViewInit(): void {

    //updating humid Values
    interval(5000).subscribe(() => {
      this.dataService.setHumidity();
      
      
    });
    
  }
}
