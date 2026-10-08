import{ Banner } from './sections/banner/banner'
import { Component } from '@angular/core';
import { Categories } from './sections/categories/categories';

@Component({
  selector: 'app-home',
  imports: [Banner, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
