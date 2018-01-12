/* tslint:disable:max-line-length */
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { UsersService } from '../user/users.service';
import * as moment from 'moment';


// the person using the app us Juliet
const me: User      = new User('Juliet', './assets/images/avatars/female-avatar-1.png');

const echo: User    = new User('박부검', './assets/images/character/bot1.png' );
const rev: User     = new User('전우성', './assets/images/character/bot2.png');
const ladycap: User = new User('긴우빈', './assets/images/character/bot3.png');


const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc, 'b1' , '0,10 100,0 100,100 0,85', '3,16 99,2 97,93 1,83' );
const tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc, 'b2', '0,0 100,10 100,85 0,100', '3,5 98,12 96,80 1,97');
const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc, 'b3', '0,10 100,0 100,100 0,85', '3,15 98,2 96,94 2,84');

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: '',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: '추가예정입니다.',
   thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `"따뜻한 마음씨를 가져야죠."
          화 한번 내지 않았을 것 같은 복학생 오빠, 컴퓨터 구매에 관한 모든 것을 알고 있다.`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: ` "내가 그런 것까지 알려줘야해?"
           남신경쓸일 없어보이는 날라리 오빠, 사실 전공 과제가 남신경쓸일 없게 만드는 것이 아닐까?`,
    thread: tRev
  }),

];

export class ChatExampleData {

  static init(messagesService: MessagesService,
              threadsService: ThreadsService,
              UsersService: UsersService): void {

    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => messagesService.addMessage(message) );

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: MessagesService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: echo,
              text: message.text,
              thread: tEcho
            })
          );
        },
        null);


    // reverse bot
    messagesService.messagesForThreadUser(tRev, rev)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: rev,
              text: message.text.split('').reverse().join(''),
              thread: tRev
            })
          );
        },
        null);

  }
}
