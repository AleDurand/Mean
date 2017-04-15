import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @Input() title: string;
  @Input() selected = false;
  @Output() tabClicked = new EventEmitter<null>();

  clicked() {
    this.tabClicked.emit();
  }

}
