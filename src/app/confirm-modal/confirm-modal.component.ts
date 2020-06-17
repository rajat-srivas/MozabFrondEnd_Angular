import { Component, OnInit, Input } from '@angular/core';
import { BoardServiceService } from '../_Service/BoardService.service';
import { Boards } from '../_Models/Boards';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
 @Input() idToDelete: string;
 @Input() entity: string;
 @Input() board: Boards;

  constructor(private boardService: BoardServiceService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.idToDelete);
    console.log(this.entity);
    console.log(this.board);
  }

yes() {
  if (this.entity === 'Task') {
   console.log('Item id to delete = ' +  this.idToDelete);
   this.boardService.deleteBoardItem(this.idToDelete).subscribe((response) => {
    const indexToRemove = this.board.BoardItems.findIndex(x => x.Id === this.idToDelete);
    this.boardService.boards.find(x => x.Id === this.board.Id).BoardItems.splice(indexToRemove, 1);  },
  (error) => {
    console.log(error);
  });
  } else {
     console.log('board to delete= ' + this.board.Id);
     this.boardService.deleteBoard(this.board.Id).subscribe((response) => {
    const boardToDelete = this.boardService.boards.findIndex(x => x.Id === this.board.Id);
    this.boardService.boards.splice(boardToDelete, 1);
  },
  (error) => {
  console.log(error);
  });
  }
  this.bsModalRef.hide();

}

}
