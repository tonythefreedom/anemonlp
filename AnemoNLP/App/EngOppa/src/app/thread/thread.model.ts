import { Message } from '../message/message.model';
import { uuid } from '../util/uuid';

/**
 * Thread represents a group of Users exchanging Messages
 */
 export class Thread {
   id: string;
   lastMessage: Message;
   name: string;
   avatarSrc: string;
   class1: string;
   codevale1: string;
   codevale2: string;

   constructor(id?: string,
               name?: string,
               avatarSrc?: string, class1?: string, codevale1?: string, codevale2?: string) {

     this.id = id || uuid();
     this.name = name;
     this.avatarSrc = avatarSrc;

     this. class1 = class1;
     this. codevale1 = codevale1;
     this. codevale2 = codevale2;

   }
 }
