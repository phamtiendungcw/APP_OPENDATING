import { Component, EventEmitter, Output } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (v) => {
        console.log(v);
        this.cancel();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
