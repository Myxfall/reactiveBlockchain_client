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
    currentMessageCounter;
    currentDiv: HTMLElement;

    diplomas: string[] = [];
    grades: string[] = [];


    constructor(private chatService: ChatService) {
        this.counter = 0;
        this.bntStyle = 'btn-default';

    }

    sendMessage() {
        var message_json = {
            message: this.message,
        }

        this.messages.push(this.message);
        this.chatService.sendMessage(message_json);
        this.currentMessageCounter = this.messages.length - 1;


        const myElement: HTMLElement = document.getElementById("testId");
        myElement.innerHTML += " Worked";
        myElement.style.background="blue";



        this.bntStyle = 'btn-default';
        this.message = '';
        this.counter = this.counter + 1;

    }

    ngOnInit() {
        this.chatService
        .getMessages().delay(1000)
        .subscribe((data) => {
            console.log(`Received value from the server with ${data}`);

            const data_record = data.record;
            switch (data_record.type) {
                case 'diploma':
                    this.diplomas.push(`${data_record.last_name} ${data_record.first_name} got ${data_record.study} diploma from the ${data_record.school}`);
                    break;
                case 'grade':
                    this.grades.push(`The student ${data_record.last_name} with netID ${data_record.username} got ${data_record.grade} for the course ${data_record.course}`);
            }
            this.bntStyle = 'btn-change';
        });
    }
}
