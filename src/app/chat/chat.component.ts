import { Component } from '@angular/core';
import { AuthentificationService } from 'services/authentification.service';
import { DataService } from 'services/data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import { Messages } from 'entities/Message';
import { Http } from '@angular/http';
import { User } from 'entities/User';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'chat-cmp',
    templateUrl: 'chat.component.html',
    styleUrls:['css/style.css']
    
    })

    export class ChatComponent{ 
        OtherUsers:any[]=[];
        chatWith=null;
        user=this.authservice.currentUser();
        MessagesCol: AngularFirestoreCollection<Messages>;
        MessagesCol2: AngularFirestoreCollection<Messages>;
        MessagesToMe: Observable<Messages[]>;
        MessagesFromMe: Observable<Messages[]>;
        allMessages;
        constructor(
            private authservice:AuthentificationService,
            private dataService:DataService,
            private db:AngularFirestore,
            private http:Http,
            private activatedRoute: ActivatedRoute
        )
        {
            
        }
        ngOnInit() {
            
            this.getallusers()
            this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
                let userId = queryParams['id'];
                let url="http://139.99.107.8/forum-ms-web/v0/user/"+userId;
                this.dataService.getAll(url).subscribe(val=>{
                    this.selectuser(  {
                        iduser:val.idMember,
                        name:val.username,
                        pic:this.traitPic(val.image)
                    }
                    );
                });
              });
            let me=this.authservice.currentUser();
            this.MessagesCol = this.db.collection('msg', ref => ref.where('id_user_d', '==', me.user_id));
            this.MessagesToMe = this.MessagesCol.valueChanges();

            this.MessagesCol2 = this.db.collection('msg', ref => ref.where('id_user_s', '==', me.user_id));
            this.MessagesFromMe=this.MessagesCol2.valueChanges();

            
            this.allMessages=Observable.combineLatest([this.MessagesToMe,this.MessagesFromMe])  
            .map(res=>{
                let array=[];
                res[0].forEach(v=>array.push(v));
                res[1].forEach(v1=>array.push(v1));
                return array;
              });

            
        }
        private getallusers()
        {
            let user=this.authservice.currentUser();
            this.dataService.getAll("http://139.99.107.8/forum-ms-web/v0/user/getAllUsers")
            .subscribe(val=>{
                let array:any[]=val ;
                array.forEach((value,index,array)=>{
                    if (value.idMember) {
                        if(user.user_id!=value.idMember){
                            this.OtherUsers.push(
                                {
                                    iduser:value.idMember,
                                    name:value.username,
                                    pic:this.traitPic(value.image)
                                });  
                                
                         }
                    }else{
                        if(user.user_id!=value){
                            let url="http://139.99.107.8/forum-ms-web/v0/user/"+value;
                            this.http.get(url).map(res=>{
                              return res.json();
                            }).subscribe(v=>{
                                this.OtherUsers.push(   {
                                iduser:v.idMember,
                                name:v.username,
                                pic:this.traitPic(v.image)
                            });
                            })
                            
                                
                         } 
                    }
                     
                    
                });
                console.log(this.OtherUsers);
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

        selectuser(user)
        {
            
            this.chatWith=user;
            
        }
        me(id){
            let user=this.authservice.currentUser();
            return id==user.user_id;
        }
        send(txt){
            let msg:string=txt.value;
            if(msg!=""){
                this.db.collection('msg').add(
                    {'content': msg,
                     'date': Date.now(),
                     'id_user_s':this.user.user_id,
                     'id_user_d':this.chatWith.iduser,
                     'vu':false
                    });
            }
            txt.value="";
        }
    }
