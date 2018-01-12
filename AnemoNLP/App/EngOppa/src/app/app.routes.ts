import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { ChatLoginComponent } from 'app/chat-login/chat-login.component';
import { ChatWindowComponent } from 'app/chat-window/chat-window.component';
import { ChatThreadsComponent } from 'app/chat-threads/chat-threads.component';

import { ChatComponent } from 'app/chat/chat.component';


const APP_ROUTES: Routes = [
    {path: '', component: ChatLoginComponent},
    {path: 'main', component: ChatThreadsComponent},
    {path: 'chat', component: ChatWindowComponent},
    {path: 'chatimg', component: ChatComponent}

];

export const routing = RouterModule.forRoot(APP_ROUTES);
