import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';


@Component({
  selector: 'app-pot-caroussel',
  templateUrl: './pot-caroussel.component.html',
  styleUrls: ['./pot-caroussel.component.scss']
})
export class PotCarousselComponent implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperContainer!: any;



  constructor(private el: ElementRef<SwiperContainer>) { }

  ngAfterViewInit(): void {
   
  }



}
