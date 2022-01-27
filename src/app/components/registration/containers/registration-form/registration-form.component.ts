import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/users.model";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  @Output() formData: EventEmitter<User> = new EventEmitter();

  form: FormGroup;

  constructor(
    private auth:Auth,
    private firestore: Firestore,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    try{
      this.register(this.form.value).then(r => this.router.navigate(['/dashboard']))
    }catch (e: any) {
      throw new Error(e);
    }
  }

  async register(data: User) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
      const {user} = await result;

      await this.addUser(user,data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

// TODO: put is function on firestore function
  private async addUser(userData:any, formData: User) {
    const {uid, emailVerified} = userData;
    const data = { userId: uid, emailVerified, ...formData};

    console.log(formData);
    const ref = doc(this.firestore, `users/${uid}`);
    await setDoc(ref, data, { merge: true });
  }

}
