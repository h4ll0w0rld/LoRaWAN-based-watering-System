import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';
import { interval } from 'rxjs';




interface DataEntry {
  id: number;
  humidity: number;
}


@Component({
  selector: 'app-humidity',

  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],

})
export class HumidityComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: any;
  chart: Chart = {} as Chart;
  val1 = "";
  water = null;
  addVal:boolean = false; 
  options = [
    { value: 'L', viewValue: 'Liter Wasser' },
    { value: 'ml', viewValue: 'ml Dünger' },
   
  ];
  selected = null;

  constructor(private dataService: DataService) {

  }

  data = [
    { devId: 2010, humidity: 10, Date: new Date() },
    { devId: 2011, humidity: 20, date: new Date() },
    { devId: 2012, humidity: 15, date: new Date() },
    { devId: 2013, humidity: 25, date: new Date() },
    { devId: 2014, humidity: 100, date: new Date() },
    { devId: 2016, humidity: 28, date: new Date() },
  ];

  clicked() {
    this.dataService.getHumidity().subscribe(
      (res: any) => {

        var resData = res;

        this.data = resData;

        this.updateChart();

      },
      (error: any) => {
        console.error('Error occurred:', error);
        // Handle the error here
      }
    );


  }
  // checkInput(){
  //   console.log("trigger with: ", this.selected)
  //   if(this.selected != null){
  //     if(this.selected === "L") {
  //       this.valInLiter = true;
  //     }else if(this.selected ==="ml"){
  //       this.valInLiter = false;
  //     }
  //   }
   
  // }
  previousDate: Date | null = null;

  formatDate(dateString: any) {
    const currentDate: Date = new Date(dateString);

    // Check if the date has changed since the last update
    if (!this.previousDate || currentDate.getDate() !== this.previousDate.getDate() || currentDate.getFullYear() !== this.previousDate.getFullYear()) {
      // Update previousDate
      this.previousDate = currentDate;
      // Display day and year
      return currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    } else {
      // Display only time
      return currentDate.toLocaleTimeString('en-GB');
    }
  }

  ngAfterViewInit(): void {

    this.clicked();
    this.createChart();
    interval(5000).subscribe(() => {
      this.dataService.getHumidity().subscribe(
        (res: any) => {

          this.data = res;
          this.updateChart();
          console.log("Call")

        })


    });
  }

  createChart(): void {

    console.log("Here", this.data.map(row => row.devId))
    const canvas = this.canvas.nativeElement;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.data.map(row => row.devId),
        datasets: [{
          data: this.data.map(row => row.humidity),
          label: "Moisture",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {

        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {


            display: true,
            title: {
              display: true
            }
          },
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Prozent %'
            },

            suggestedMax: 100
          }
        }
      },
      // type: 'line',
      // data: {
      //   labels: this.data.map(row => row.devId),
      //   datasets: [{
      //     data: this.data.map(row => row.humidity),
      //     label: "Moisture",
      //     borderColor: "#3e95cd",
      //     fill: false
      //   }
      //   ]
      // },

      // options: {
      //   plugins: {


      //   }
      //   suggestedMin: -10,
      //   suggestedMax: 200,

      // }
    });


  }

  updateChart(): void {

    // console.log(this.data, "here i am ", this.data.map(row => row.id))
    if (this.chart) {

      this.chart.data.labels = this.data.map(row => this.formatDate(row.Date));
      this.chart.data.datasets[0].data = this.data.map(row => row.humidity);
      this.chart.update();

    }
  }

  // Call this method whenever the data changes
  onDataChange(): void {
    this.updateChart();
  }

}



