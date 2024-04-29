import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private users = [
    { name: 'John Doe', email: 'john@example.com', password: 'password1' },
    { name: 'Jane Doe', email: 'jane@example.com', password: 'password2' },
    { name: 'Default User', email: 'default@example.com', password: 'password3' } // Usuario por defecto
  ];

  constructor(private router: Router) { }

  register(name: string, email: string, password: string) {
    const newUser = { name, email, password };
    this.users.push(newUser);
    this.loggedIn = true;
    localStorage.setItem('user', JSON.stringify(newUser));
    this.router.navigate(['/test']);
  }

  login(email: string, password: string) {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.loggedIn = true;
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/test']);
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
