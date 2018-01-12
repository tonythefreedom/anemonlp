import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';

// for angularfire auth
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { moveIn } from '../router.animations';

@Component({
  selector: 'chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css'],
  animations: [moveIn()],
  // host: {'[@moveIn]': ''}
})

export class ChatLoginComponent implements OnInit {
  private user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth) {
    }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        this.router.navigate(['/main']);
      } else {
        // console.log('nope.');
      }
    });
    // console.log('로그인 서비스', this.authService);
    // if (this.authService != null) {
    //   this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
    // }
  }

  loginGoogle() {
    firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then((result) => {
          if (result.credential) {
            const token = result.credential.accessToken;
          }
          const userInfo = result.user;
          // console.log(firebase.auth().currentUser);
          this.router.navigate(['/main']);
        });
    });
  }

  loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      if (result.credential) {
        const token = result.credential.accessToken;
      }
      const userInfo = result.user;
      // console.log(userInfo);
      this.router.navigate(['/main']);
    });
  }

  Google() {
    // 구글 소셜로그인 완료시 main 페이지로 라우터를 이동하세요
    // this.router.navigate(['/main']);
    console.log('유저:', this.user);
    console.log('로그깅:', this.loggedIn);

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    if (this.user == null) {
      alert('로그인을 해주셔야 진행이 가능합니다.');
        return false;
      }
    // this.router.navigate(['/main']);

  };

  Kakaotalk() {
    if (this.user == null) {
      alert('로그인을 해주셔야 진행이 가능합니다.');
      return false;
    }
     this.router.navigate(['/main']);
  };

  Facebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    if (this.user == null) {
      alert('로그인을 해주셔야 진행이 가능합니다.');
      return false;
    }
    this.router.navigate(['/main']);
  };
}
