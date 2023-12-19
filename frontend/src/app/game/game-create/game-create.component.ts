
import { Component,OnInit } from '@angular/core';
import{NgForm} from '@angular/forms';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  constructor(public gameservice:GameServiceService){}
  ngOnInit():void
  {

  }

  onaddgame(gameform:NgForm)
  {
    if(gameform.invalid)
    {
      alert('Task details not complete , please fill all fields')
      return
    }
    alert(gameform.value.enteredname+':'+gameform.value.entereddesc)

    this.gameservice.addatask_service(gameform.value.enteredname,gameform.value.entereddesc,gameform.value.enteredstatus)
    gameform.resetForm()
  }
}
