import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VirtualListComponent } from './virtual-list/virtual-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VirtualListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'virtual-list';
  comments: number[] = []
  ngOnInit() {
    for(let i = 0; i < 10000; i++) {
      this.comments.push(i)
    } 
  }
}
