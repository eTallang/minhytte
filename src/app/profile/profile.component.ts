import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'mh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  private user: firebase.User | null | undefined;
  displayName = new FormControl();
  oldDisplayName: string | null | undefined;
  email = new FormControl();
  oldEmail: string | null | undefined;
  password = new FormControl('', Validators.required);
  passwordInputType: 'password' | 'text' = 'password';
  updatingPassword = false;

  constructor(private auth: AngularFireAuth, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.auth.user.pipe(takeUntil(this.unsubscriber)).subscribe((user) => {
      this.user = user;
      this.displayName.setValue(user?.displayName);
      this.email.setValue(user?.email);
    });
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
    this.updatingPassword = true;
    this.user?.updatePassword(this.password.value).then(() => {
      this.updatingPassword = false;
      this.showAlert('Passord er blitt endret.');
    }, err => {
      this.updatingPassword = false;
      console.log(err);
      this.showAlert(err.message);
    });
  }

  updateEmail(): void {
    if (this.oldEmail !== this.email.value) {
      this.oldEmail = this.email.value;
      this.user?.updateEmail(this.email.value);
    }
  }

  updateDisplayName(): void {
    if (this.oldDisplayName !== this.displayName.value) {
      this.oldDisplayName = this.displayName.value;
      this.user?.updateProfile({
        displayName: this.displayName.value
      });
    }
  }

  onInputKeydown(event: KeyboardEvent, input: HTMLInputElement, type: 'displayName' | 'email'): void {
    if (event.key === 'Enter') {
      input.blur();

      if (type === 'displayName') {
        this.updateDisplayName();
      } else if (type === 'email') {
        this.updateEmail();
      }
    }
  }

  signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  private showAlert(text: string): void {
    this.alertService.open(undefined, text);
  }
}
