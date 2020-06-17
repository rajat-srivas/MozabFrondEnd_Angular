import { BoardItem } from './BoardItem';

export interface Boards {
    Id: string;
    BoardTitle: string;
    LinkedUser: string;
    BoardItems: BoardItem[];
}
