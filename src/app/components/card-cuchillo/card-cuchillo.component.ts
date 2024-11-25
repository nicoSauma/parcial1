import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Cuchillo } from '../../types/cuchillo';

@Component({
  selector: 'app-card-cuchillo',
  standalone: true,
  imports: [],
  templateUrl: './card-cuchillo.component.html',
  styleUrl: './card-cuchillo.component.css'
})
export class CardCuchilloComponent {

  @Input() cuchillo!:Cuchillo;
  @Output() deleteEvent = new EventEmitter <String>;
  @Output() detailEvent= new EventEmitter <String>;

  onDelete(){
    this.deleteEvent.emit(this.cuchillo.id)
  }

  onDetail(){
    this.detailEvent.emit(this.cuchillo.id)
  }

}
