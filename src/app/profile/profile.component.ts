import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'services/data.service';
import { AuthentificationService } from 'services/authentification.service';


@Component({
    moduleId: module.id,
    selector: 'profile-cmp',
    templateUrl: 'profile.component.html'
    
    })

    export class ProfileComponent{ 
            userId;
         public user;
        constructor(private activatedRoute: ActivatedRoute,private ds:DataService,private auth:AuthentificationService)
        {
            
        }
        ngOnInit() {
            this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
                this.userId = queryParams['id'];
                let url="http://139.99.107.8/forum-ms-web/v0/user/"+this.userId;
                this.ds.getAll(url).subscribe(val=>{
                    this.user=val;
                    this.user.image=this.traitPic(val.image)
                });
              });
        }
        public traitPic(pic){
            let path=null;
            if(pic){
             if (pic.indexOf("/opt/wildfly/welcome-content") !== -1) {
               path = pic.replace("/opt/wildfly/welcome-content", "139.99.107.8");
               path = "http://" + path;
             }else{
               path=pic;
             }
            }
            return path;
        }
        public showbtn(){
            return this.auth.currentUser().user_id==this.userId;
        }
    }
