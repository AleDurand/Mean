import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'album-list-page',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent {

  public filter: string;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.filter = data.filter;
      console.log(this.filter);
    });
  }
}
