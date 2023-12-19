import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {
  tasks:{_id:string,task:string,description:string,status:string, __v:string}[] = [];

  constructor(public taskservice: GameServiceService){

  }

  private gamesub!: Subscription;
  
  ngOnInit() {
    this.taskservice.getgame_service();
    this.gamesub = this.taskservice.getUpdateListener()
    .subscribe((task:{_id:string,task:string,description:string,status:string, __v:string}[])=>{

      this.tasks = task;
    });
    
  }
  ngOnDestroy()
  {
    this.gamesub.unsubscribe();
  }
  ondelete(gameid:string){

    const task = this.tasks.find(t => t._id === gameid);
    if (task) {
   
      alert(`Task: ${task.task} deleted`);

      this.tasks = this.tasks.filter(t => t._id !== gameid);
    }
    
    this.taskservice.deletegame_service(gameid);
  }
  

}
