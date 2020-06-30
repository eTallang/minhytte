import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  fg = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  error = '';
  signingIn = false;

  constructor(private authService: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.fg.statusChanges.pipe(takeUntil(this.unsubscriber)).subscribe(() => {
      if (this.fg.touched && this.fg.invalid) {
        this.error = 'Vennligst skriv inn e-post og passord.';
      } else {
        this.error = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  signIn(): void {
    this.signingIn = true;
    const values = this.fg.getRawValue();
    this.authService.signInWithEmailAndPassword(values.email, values.password).then(() => {
      this.router.navigate(['']);
      this.signingIn = false;
    }, err => {
      this.error = err.message;
      this.signingIn = false;
    });
  }
}
