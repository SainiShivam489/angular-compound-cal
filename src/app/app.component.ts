import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  principal: number;
  rate: number;
  time: number;
  compounded: number;
  total = [];
  chart = [];
  amountArray = [];
  monthNumber = [];

  //mPayment:number = 0;
  showAnswer: boolean = false;

  clearResult() {
    this.showAnswer = false;
  }

  calculateInterest() {
    this.total = [];
    this.chart = [];
    this.amountArray = [];
    this.monthNumber = [];
    this.showAnswer = true;
    for(let i = 1; i <= this.time; i++) {
      let monthlyAmount: number = this.calculateMonthlyInterest(i, this.rate, this.compounded, this.principal);
      let totalInterest = monthlyAmount - this.principal;
      let arrayObject = {
        month : i,
        Amount : monthlyAmount,
        totalInterest : totalInterest
      }
      this.amountArray.push(monthlyAmount);
      this.monthNumber.push(i);
      this.total.push(arrayObject);
      //console.log(this.total);
    }
    this.chart = new Chart('canvas', {
      type:'line',
      data: {
        labels: this.monthNumber,
        datasets: [{
          label:'My First Chart',
          data: this.amountArray,
          backgroundColor:'red',
          borderColor:'red',
          fill: false
      }]
      }
    })
  }

  calculateMonthlyInterest(time:number,rate:number,compounding:number,principal:number) {
    //console.log(time,rate,compounding,principal);
    let months = time*(1/12);
    let base = (1+rate/(100*this.compounded));/*(1+r/n) */
    let power = Math.pow(base,months*compounding);/* (1+r/n)^nt */
    let total:number = principal*power;
    let amount = total.toFixed(2);
    let finalAmount = parseInt(amount);
    //console.log(Math.floor(total));
    return finalAmount;
  }
}
