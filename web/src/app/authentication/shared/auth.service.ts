import { Injectable, NgZone } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from 'firebase';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        this.user = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

  async register(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.zone.run(() => this.router.navigate(['/login']));
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  getToken(): Observable<string> {
    return from(this.user.getIdToken());
  }

  isLoggedIn() {
    const user = this.getUser();
    return user != null;
  }

  private setUserData(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}