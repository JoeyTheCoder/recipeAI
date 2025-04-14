import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Navigation items
  navItems = [
    { label: 'Features', path: '/features' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Pricing', path: '/pricing' }
  ];
}
