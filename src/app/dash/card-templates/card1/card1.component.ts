import {Component} from '@angular/core';
import {CardTemplateBaseComponent} from '../card-template-base';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.css']
})

export class Card1Component extends CardTemplateBaseComponent {
  displayedColumns: string[] = ['metric', 'value'];
}
