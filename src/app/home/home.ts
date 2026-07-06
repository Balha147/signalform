import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgClass, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  public developer = signal({
    name: 'Hedi Basly',
    role: 'Angular Developer',
    avatarInitials: 'HB',
    linkedinUrl: 'https://www.linkedin.com/in/mohamed-hedi-basly/',
    githubUrl: 'https://github.com/Balha147',
    email: 'baslymohamedhedi@gmail.com'
  });

  public appStats = signal([
    { label: 'Architecture', value: 'Angular v22', icon: '⚡', color: 'text-red-500 bg-red-50' },
    { label: 'Form Validation', value: 'Schema', icon: '🛡️', color: 'text-purple-500 bg-purple-50' },
    { label: 'State Management', value: 'Signals', icon: '🚦', color: 'text-emerald-500 bg-emerald-50' }
  ]);
}
