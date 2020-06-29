import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fg = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AngularFireAuth, private router: Router) {}

  signIn(): void {
    const values = this.fg.getRawValue();
    this.authService.signInWithEmailAndPassword(values.email, values.password).then(() => {
      this.router.navigate(['']);
    });
  }
}
