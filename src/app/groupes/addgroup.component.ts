import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'services/data.service';
import { AuthentificationService } from 'services/authentification.service';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'add-group-cmp',
    templateUrl: 'addgroup.component.html'
    
    })

    export class AddGroupComponent{ 
                constructor(private activatedRoute: ActivatedRoute,private ds:DataService,
                private auth:AuthentificationService)
        {
            
        }
        ngOnInit() {
            
        }
        addgroup(f){
            let user=this.auth.currentUser().user_id;
            let url="http://139.99.107.8/forum-ms-web/v0/group/addGroup?idUser="+user+
            "&groupName="+f.value.name;
            
            this.ds.Create(url,null,null).subscribe(val=>{
                if(val.error){
                    this.showNotification(val.error);
                }else
                {
                    this.showNotification(val.succes);
                }
            })
        }
        showNotification(html){
            console.log(html);
          $.notify({
              icon: "notifications",
              message: html
          
          },{
              type:'rose',
              timer: 3000,
              placement: {
                  from: 'top',
                  align: 'right'
              }
          });
          
          } 
    }
