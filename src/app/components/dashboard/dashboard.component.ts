import { Component, OnInit } from '@angular/core';
import {Auth, getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {collection, collectionData, doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth:Auth,
    private router: Router,
    private _authService: AuthService
  ) {}


  ngOnInit(): void {}

  // Sign Out
  logout() {
    try{
      this._authService.signOut().then(r => this.router.navigate(['/sign-in']))
    }catch (e: any) {
      throw new Error(e);
    }
  }



}
