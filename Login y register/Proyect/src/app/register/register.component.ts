import { Component } from "@angular/core";
import { UsersService } from "../users/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  email!: string;
  private _password: string | undefined;
confirmPassword: any;
  public get password(): string {
    return this.password;
  }
  public set password(value: string) {
    this._password = value;
  }
  passwordError!: boolean;

  constructor(public userService: UsersService) {}

  register() {
    const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe((data: { token: String; }) => {
      this.userService.setToken(data.token);
    });
  }
}
