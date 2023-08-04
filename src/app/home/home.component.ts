import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
            RouterLink],
  template: `

<link href="https://fonts.googleapis.com/css?family=Arvo&display=swap" rel="stylesheet">

<nav role="navigation" class="primary-navigation">
  <ul>
    <li><a href="#">About us</a></li>
    <li><a href="#">Contact</a></li>
    <li><img src="../../assets/images/freenety.png" alt="free" height="50"></li>
    <li><a [routerLink]='["/signin"]'>Login</a></li>
    <li><a [routerLink]='["/signup"]'>Sign up</a></li>
  </ul>
</nav>



<div class="blog-card">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
      <ul class="details">
        <li class="author"><a href="#">John Doe</a></li>
        <li class="date">Aug. 24, 2015</li>
        <li class="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>Learning to Code</h1>
      <h2>Opening a door to the future</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)"></div>
      <ul class="details">
        <li class="author"><a href="#">Jane Doe</a></li>
        <li class="date">July. 15, 2015</li>
        <li class="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">JavaScript</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }

  imageUrl = '/src/assets/images/freenety.png';
}
