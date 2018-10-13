import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'services/data.service';
import { AuthentificationService } from 'services/authentification.service';
declare var $:any;


@Component({
    moduleId: module.id,
    selector: 'cart',
    templateUrl: 'cartgroup.component.html'
    
    })

    export class CartComponent{ 
        
        @Input()
        group;
        @Output() deletedgroup = new EventEmitter();
        
        usersgroup=[];
        groupop;
        user;
        userFromSe;
        in=false;
                constructor(private activatedRoute: ActivatedRoute,private ds:DataService,private auth:AuthentificationService)
        {
        }
        ngOnInit() {
            
            this.groupop=this.group;
            this.user=this.auth.currentUser().user_id;

            
            let url3="http://139.99.107.8/forum-ms-web/v0/user/"+this.user;
            this.ds.getAll(url3).subscribe(v=>{
                this.userFromSe=v;
            });
            if(!(this.groupop.idGroup)){
                let url="http://139.99.107.8/forum-ms-web/v0/group/getGroupById/"+this.groupop; 
                this.ds.getAll(url).subscribe(val=>{
                    this.groupop=val;
                    let url2="http://139.99.107.8/forum-ms-web/v0/user/"+this.groupop.creator.idMember;
                    this.ds.getAll(url2).subscribe(v=>{
                        this.groupop.creator.user=v;
                    });



                    //chargingusersgroup
                    this.groupop.groupMembres.forEach(element => {
                        if (element.idMember) {
                            this.usersgroup.push(element)
                        }else{
                            let url2="http://139.99.107.8/forum-ms-web/v0/user/"+element;
                            this.ds.getAll(url2).subscribe(v=>{
                                this.usersgroup.push(v)
                            });
                        }
                        this.checkin();
                    });
                    //chargingusersgroup



                });

            }else{
                let url="http://139.99.107.8/forum-ms-web/v0/user/"+this.groupop.creator.idMember;
                this.ds.getAll(url).subscribe(val=>{
                    this.groupop.creator.user=val;
                
                })
                 //chargingusersgroup
                 this.groupop.groupMembres.forEach(element => {
                    if (element.idMember) {
                        this.usersgroup.push(element)
                    }else{
                        let url2="http://139.99.107.8/forum-ms-web/v0/user/"+element;
                        this.ds.getAll(url2).subscribe(v=>{
                            this.usersgroup.push(v)
                        });
                    }
                    this.checkin();
                });
                //chargingusersgroup
            }
             
        }
        joingroup(){
            let url="http://139.99.107.8/forum-ms-web/v0/group/addUserToGroup/"+
            this.user+
            "/"+this.groupop.idGroup;
            this.ds.update(url,null,null).subscribe(val=>{
                if(val.error){
                    this.showNotification(val.error);
                }else
                {
                    this.in=true;
                    this.showNotification(val.succes);
                    this.usersgroup.push(this.userFromSe);
                }
            })
        }
        leavegroup(){
            let url="http://139.99.107.8/forum-ms-web/v0/group/removeUserFromGroup/"+
            this.user+
            "/"+this.groupop.idGroup;
            this.ds.delete(url,null).subscribe(val=>{
                if(val.error){
                    this.showNotification(val.error);
                }else
                {
                    this.in=false;
                    this.showNotification(val.succes);
                    let index = this.usersgroup.indexOf(this.userFromSe);
                    this.usersgroup.splice(index, 1);
                }
            })
        }
        removegroup(){
            let url="http://139.99.107.8/forum-ms-web/v0/group/removeGroup/"+this.groupop.idGroup;
            this.ds.delete(url,null).subscribe(val=>{
                if(val.error){
                    this.showNotification(val.error);
                }else
                {
                    this.showNotification(val.succes);
                    this.deletedgroup.emit(this.group);
                }
            })
        }
        editgroup(f){
            let url="http://139.99.107.8/forum-ms-web/v0/group/updateGroupName/"+this.groupop.idGroup+
            "/"+f.value.name;
            
            this.ds.update(url,null,null).subscribe(val=>{
                if(val.error){
                    this.showNotification(val.error);
                }else
                {
                    this.showNotification(val.succes);
                    this.groupop.name=f.value.name;
                    $('#myModal').modal('hide');
                }
            })
        }
        checkin(){
            for (let i = 0; i < this.usersgroup.length; i++) {
                if (this.usersgroup[i].idMember==this.user) {
                  this.in=true;break;
                }
            }
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
    }
