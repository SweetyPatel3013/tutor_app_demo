import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

import {Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {User} from "../../../../core/models/users.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Output() formData: EventEmitter<User> = new EventEmitter();

  loginForm: FormGroup;
  item$: Observable<any>;
  title: any;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    firestore: Firestore,
    private fb: FormBuilder,
    public auth: Auth
  ) {

    const testCollection = collection(firestore, 'Test');
    this.item$ = collectionData(testCollection);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login(){
    const {email, password} = this.loginForm.value;
    console.log({email,password});
    try{
      await signInWithEmailAndPassword(this.auth, email, password)
        .then(r => this.authService.setCurrentUser(email))
        .then(r => this.router.navigate([`/${this.authService.currentUserRole}`]))
    }catch (e: any) {
      throw new Error(e);
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider)
      .then(() => this.router.navigate(['dashboard']))
      .catch((e) => console.log(e.message));

  }

}
