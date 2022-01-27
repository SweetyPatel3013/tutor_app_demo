import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "@angular/fire/auth";
import {doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {User} from "../../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean = false;
  currentUserRole: string;

  constructor(
    private auth:Auth,
    private firestore:Firestore
  ) {
    this.getUser();
    this.loggedIn = !!sessionStorage.getItem('user');
  }

// Set current user in your session after a successful login
  setCurrentUser(email: string): void {
    sessionStorage.setItem('user', email);
    this.loggedIn = true;
  }

// Get currently logged in user from session
  getCurrentUser(): string | any {
    return sessionStorage.getItem('user') || undefined;
  }

// Clear the session for current user & log the user out
  signOut() {
    sessionStorage.removeItem('user');
    this.loggedIn = false;

    return signOut(this.auth);
  }

// The method to check whether user is logged in or not
  isLoggedIn() {
    if (this.getCurrentUser() !== undefined)
      return true;
    else
      return false;
  }

  getUser(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.getRole(uid);
      }
    });
  }


  async getRole(uid: any){
    const ref = doc(this.firestore, `users/${uid}`);
    const userData = await getDoc(ref);
    if (userData.exists()) {
      const {role} = userData.data();
      this.currentUserRole = role;
      console.log(this.currentUserRole)
    }
  }

}
