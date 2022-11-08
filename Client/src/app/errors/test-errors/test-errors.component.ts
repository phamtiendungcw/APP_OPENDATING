import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/App/OpenDating/';
  validationErrors: string[ ] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'Buggy/Not-Found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'Buggy/Bad-Request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'Buggy/Server-Error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'Buggy/Auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'Account/Register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

}
