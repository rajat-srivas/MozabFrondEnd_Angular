import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CardComponent } from './../card/card.component';
import { BoardServiceService } from './../_Service/BoardService.service';
import {Observable} from 'rxjs';
import { Boards } from './../_Models/Boards';
import { BoardItem } from './../_Models/BoardItem';
import { AuthServiceService } from './../_Service/AuthService.service';
import { AlertifyService } from './../_Service/alertify.service';

@Component({
  selector: 'app-dshboard',
  templateUrl: './dshboard.component.html',
  styleUrls: ['./dshboard.component.css']
})
export class DshboardComponent implements OnInit {
  title = 'app';
  componentRef: any;
  boards: Boards[] = [] ;
  newBoard = {Id: '', BoardTitle: 'Board Name', LinkedUser: this.authService.appUser.Email
  , BoardItems: [{Id: '', Item: '', BoardId: '1'}]};
  initBoard = {Id: '', BoardTitle: 'Board Name', LinkedUser: this.authService.appUser.Email
  , BoardItems: [{Id: '', Item: '', BoardId: '1'}]};

  @ViewChild('messagecontainer',  { static: true, read: ViewContainerRef }) entry: ViewContainerRef;

  // tslint:disable-next-line: max-line-length
  constructor(private resolver: ComponentFactoryResolver, private boardService: BoardServiceService,
              private alert: AlertifyService, private authService: AuthServiceService) { }

  ngOnInit() {
    this.getBoards(this.authService.appUser.Email);
  }

  createComponent(message) {
      this.createBoard(this.newBoard);
  }
  destroyComponent() {
      this.componentRef.destroy();
  }

  createBoard(emptyBoard) {
  this.boardService.createNewBoard(emptyBoard).subscribe((response) => {
      this.newBoard.Id = response as string;
    // this.newBoard.BoardItems.forEach(x => x.BoardId = response as string);
      this.boardService.boards.push({...this.newBoard});
      this.newBoard = this.initBoard;
      this.newBoard.Id = '';
      this.newBoard.BoardItems = [{Id: '', Item: '', BoardId: '1'}];
  },
  (error) =>
  { console.log(error);
  });
}

   async getBoards(email: string) {
    await this.boardService.getBoardsByUser(email).subscribe((response) => {
      this.boards = response as Boards[];
      this.boardService.boards = response as Boards[];
    },
    (error) => {
      console.log(error);
    });
    }

  SaveChanges(){
    console.log(this.boardService.boards);
    this.boardService.saveAllBoards(this.boardService.boards).subscribe((response) => {
      console.log('After Save');
      this.alert.success('All set, changes are saved..')
    },
    (error) => {
      console.log(error);
      this.alert.error(error);
    });
  }
}
