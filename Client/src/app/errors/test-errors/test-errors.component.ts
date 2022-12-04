import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-test-errors",
  templateUrl: "./test-errors.component.html",
  styleUrls: ["./test-errors.component.css"],
})
export class TestErrorsComponent {
  baseUrl = "https://localhost:5001/App/OpenDating/";
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  get404Error() {
    this.http.get(this.baseUrl + "Buggy/Not-Found").subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + "Buggy/Bad-Request").subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + "Buggy/Server-Error").subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + "Buggy/Auth").subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + "Account/Register", {}).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        this.validationErrors = e;
      },
    });
  }
}
