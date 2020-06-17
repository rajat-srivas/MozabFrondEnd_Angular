import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { Boards } from './../_Models/Boards';
import { BoardServiceService } from './../_Service/BoardService.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BoardItem } from './../_Models/BoardItem';
import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { AuthServiceService } from './../_Service/AuthService.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() boardId: string;
bsModalRef: BsModalRef;
config = {
  animated: true,
  keyboard: true,
  class: 'modal-dialog-centered',
  initialState : {
    idToDelete: '',
    entity: '',
    board: {}
  }
};
itemCounter: number[] = [1];
colorArray: string[] = ['#6e5773', '#d45079' , '#ea9085', '#e9e1cc', '#f3c623'];
skills = new FormArray([]);
board: Boards = ({Id: '1', BoardTitle: 'Board Name', LinkedUser: this.authService.appUser.Email
, BoardItems: [{Id: '', Item: '', BoardId: '1'}]});


  constructor(private boardService: BoardServiceService, private authService: AuthServiceService, private modalService: BsModalService) { }
  ngOnInit() {
    this.getBoardDetails();
  }

addNewItem() {
  this.board.BoardItems.push({Id: '', Item: '', BoardId: this.boardId});
}

getColor(i: number) {
  return this.colorArray[i % 5];
}

deleteBoard() {
  this.config.initialState.idToDelete = this.board.Id;
  this.config.initialState.entity = 'Board';
  this.showConfirmationModal();
}

deleteBoardItem(id: string) {
  this.config.initialState.idToDelete = id;
  this.config.initialState.entity = 'Task';
  this.showConfirmationModal();
}

showConfirmationModal() {
  this.config.initialState.board = this.board;
  this.bsModalRef = this.modalService.show(ConfirmModalComponent, this.config);
  this.bsModalRef.content.closeBtnName = 'Close';
}

getBoardDetails() {
  if (this.boardId !== undefined && this.boardId !== '') {
this.board = this.boardService.boards.find(x => x.Id === this.boardId);
console.log('here');
console.log(this.boardId);
}
}


}
