import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angular4-social-login';
import {Router} from '@angular/router';

// for angularfire auth
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // private user: SocialUser;
  private user;
  private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {

    // console.log('user: ', firebase.auth().currentUser.displayName);
    this.user = firebase.auth().currentUser;

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  // 히스토리 부분 보기
  clicked(event: any): void{
    this.router.navigate(['/chat']);
  }

  goto(url: any): void {
    this.router.navigate(['/main']);
  }

  SignOut() {
    // this.authService.signOut();
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
