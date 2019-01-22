import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi:DataApiService) { }

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;


  ngOnInit() {
  }



  onSaveBook(bookForm: NgForm): void {

    if (bookForm.value.id == null){
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);

    } else {

      this.dataApi.updateBook(bookForm.value);


    }
      //new
      bookForm.resetForm();
      this.btnClose.nativeElement.click();
  }

}
