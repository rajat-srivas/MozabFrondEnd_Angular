import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Boards } from './../_Models/Boards';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {
baseUrl = environment.baseUrl;
boards: Boards[] = [];
addNewBoardClicked = false;
newEmptyBoard = {Id: '', BoardTitle: 'Board Name', LinkedUser: 'rajat.sedate@gmail.com'
, BoardItems: [{Id: '', Item: '', BoardId: '1'}]};

constructor(private http: HttpClient) { }

getBoardsByUser(email: string) : Observable<any> {
return this.http.get(this.baseUrl + '/board/getAllBoardsByUser' + '?userEmail=' + email);
}

createNewBoard(newBoards) {
  return this.http.post(this.baseUrl + '/board/createBoard', newBoards);
}

saveAllBoards(boardList) {
  return this.http.put(this.baseUrl + '/board/saveBoards', boardList);
}

deleteBoardItem(itemid) {
  return this.http.delete(this.baseUrl + '/board/deleteBoardItem?id=' + itemid);
}

deleteBoard(boardId) {
  return this.http.delete(this.baseUrl + '/board/deleteBoard?id=' + boardId);
}

}
