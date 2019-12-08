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
    diplomas_json = [];
    grades_json = [];

    type:string;
    username:string;
    school:string;
    study:string;
    course:string;
    grade:string;
    first_name:string;
    last_name:string;

    constructor(private chatService: ChatService) {
        this.counter = 0;
        this.bntStyle = 'btn-default';

    }

    sendMessage() {
        var json_to_send = null;
        switch (this.type) {
            case 'diploma':
                json_to_send = {
                    type: this.type,
                    username: this.username,
                    school: this.school,
                    study: this.study,
                    first_name: this.first_name,
                    last_name: this.last_name,
                }
                break;
            case 'grade':
                json_to_send = {
                    type: this.type,
                    username: this.username,
                    school: this.school,
                    course: this.course,
                    grade: this.grade,
                    first_name: this.first_name,
                    last_name: this.last_name,
                }
                break;
        }
        console.log(json_to_send);
        //this.diplomas.push(`${json_to_send.last_name} ${json_to_send.first_name} got ${json_to_send.study} diploma from the ${json_to_send.school}`);
        this.diplomas.push("Sending in process...");
        this.chatService.sendMessage(json_to_send);

        // const myElement: HTMLElement = document.getElementById("testId");
        // myElement.innerHTML += " Worked";
        // myElement.style.background="blue";

        this.bntStyle = 'btn-default';
    }

    ngOnInit() {
        this.chatService
        .getMessages().delay(1000)
        .subscribe((data) => {
            console.log(`Received value from the server with ${JSON.stringify(data)}`);

            if (this.diplomas.includes("Sending in process...")) {
                this.diplomas.pop();
            }
            else if (this.grades.includes("Sending in process...")) {
                this.grades.pop();
            }

            const data_record = data.record;
            switch (data_record.type) {
                case 'diploma':
                    this.diplomas.push(`${data_record.last_name} ${data_record.first_name} got ${data_record.study} diploma from the ${data_record.school}`);
                    this.diplomas_json.push(data_record);
                    break;
                case 'grade':
                    this.grades.push(`The student ${data_record.last_name} with netID ${data_record.username} got ${data_record.grade} for the course ${data_record.course}`);
                    this.grades_json.push(data_record);
                    break;
            }
            this.bntStyle = 'btn-change';
        });
    }
}
