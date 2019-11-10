import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;
  messages: string[] = [];
  counter;
  bntStyle: string;


  constructor(private chatService: ChatService) {
      this.counter = 0;
      this.bntStyle = 'btn-default';

  }

  sendMessage() {
      var message_json = {
          message: this.message,
      }
    this.chatService.sendMessage(message_json);
    //this.chatService.sendMessage(this.message);
    this.messages.push(this.message);

     const myElement: HTMLElement = document.getElementById("testId");
    myElement.innerHTML += "Worked";
 	myElement.style.background="blue";


    this.bntStyle = 'btn-default';
    this.message = '';
    this.counter = this.counter + 1;

  }

  ngOnInit() {
    this.chatService
      .getMessages().delay(1000)
      .subscribe((message: string) => {
        this.messages.push(message);
        this.bntStyle = 'btn-change';

      });
  }
}
