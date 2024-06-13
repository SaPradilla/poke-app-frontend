import { Component,Output, EventEmitter,OnInit } from '@angular/core';


@Component({
  selector: 'app-modal-add',
  templateUrl:'./modal_add.component.html',
  
})
export class ModalAddComponent {
  

  @Output() close = new EventEmitter<void>();
  
  onClose():void{
    this.close.emit(); 
  }

 


}
