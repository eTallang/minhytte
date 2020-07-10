import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  private user: firebase.User | null | undefined;
  photoUrl: string | null | undefined;
  displayName = new FormControl();
  email = new FormControl();
  password = new FormControl('', Validators.required);
  passwordInputType: 'password' | 'text' = 'password';

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.pipe(takeUntil(this.unsubscriber)).subscribe((user) => {
      this.user = user;
      this.photoUrl = user?.photoURL;
      console.log(user?.displayName);
      this.displayName.setValue(user?.displayName);
      this.email.setValue(user?.email);
    });

    this.listenForValueChanges('displayName');
    this.listenForValueChanges('email');
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  togglePasswordInputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  updatePassword(): void {
    this.user?.updatePassword(this.password.value);
  }

  signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  private listenForValueChanges(propName: 'displayName' | 'email') {
    this[propName].valueChanges
      .pipe(debounceTime(400), takeUntil(this.unsubscriber))
      .subscribe((updatedValue) => {
        if (propName === 'displayName') {
          this.user?.updateProfile({
            displayName: updatedValue
          });
        } else {
          this.user?.updateEmail(updatedValue);
        }
      });
  }
}
