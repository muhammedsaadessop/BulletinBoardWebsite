import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
private taskdisplay:{_id:string,task:string,description:string,status:string, __v:string}[] = [];
 private updatedtasks = new Subject<{_id:string,task:string,description:string,status:string, __v:string}[]>();
constructor(private http:HttpClient) { }

  addatask_service(pid:string,pname:string,pstatus:string)
  {
    this.http.post<{message:string,tasklist:any}>('https://localhost:3000/api/tasks',{task:pid,description:pname,status:pstatus})
    .subscribe((thegame)=>
      {
          this.taskdisplay.push(thegame.tasklist);
          this.updatedtasks.next([...this.taskdisplay]);
      })
  }

  getgame_service() {
    this.http.get<{message: string, tasklist: any[]}>('https://localhost:3000/api/tasks')
      .subscribe((thegame) => {
        console.log(thegame);
        this.taskdisplay = thegame.tasklist
        console.log(this.taskdisplay)
        this.taskdisplay.forEach(todo=> {
          console.log(todo);
          this.updatedtasks.next([...this.taskdisplay]);
        });
      });
  }
  
  deletegame_service(gameid:string)
  {
    this.http.delete('https://localhost:3000/api/tasks/'+ gameid)
    .subscribe(()=>
    {
      const updatedgamesdeleted = this.taskdisplay.filter(todo=>todo._id!==gameid);
      this.taskdisplay= updatedgamesdeleted;
      this.updatedtasks.next([...this.taskdisplay]);

    }
    
    )

  }

getUpdateListener()
{
  return this.updatedtasks.asObservable();
}
}
