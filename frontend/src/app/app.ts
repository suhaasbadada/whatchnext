import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main style="height:calc(100vh - 64px); display:flex; align-items:center; justify-content:center;">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('frontend');
}
