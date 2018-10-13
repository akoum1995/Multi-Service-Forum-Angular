import { Component,state,style,animate,transition, trigger, keyframes } from '@angular/core';
import { AuthentificationService } from 'services/authentification.service';
import { User } from 'entities/User';
import { Http,Headers, RequestOptions } from '@angular/http';
import { DataService } from 'services/data.service';


declare var $:any;
interface FileReaderEventTarget extends EventTarget {
    result:string
}
interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}
@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
    animations: [
        trigger('carduserprofile', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1
            })),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out'),
            ])
        ]),
        trigger('cardprofile', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
                transition('void => *', [
                    style({opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform':'translate3D(0px, 150px, 0px)',
                        transform:'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0.25s ease-out')
                ])
            ])
        ]
    })

    export class UserComponent{ 
        pp=0;
         object: Object =
         { 
             'width': '0%',
             'animation': 'progress-bar-stripes 2s linear infinite',
             'background-color': '#9c27b0'
        };
        constructor(private authservice:AuthentificationService,private dataService:DataService)

        {

        }
        ngOnInit() {
            
            let user:User=this.authservice.currentUser();
            if(user.firstName&&user.firstName!='null'&&user.firstName!=''){
                this.pp=this.pp+20;
            }
            if(user.lastName&&user.lastName!='null'&&user.lastName!=''){
                this.pp=this.pp+20;
            }
            if(user.phoneNumber&&user.phoneNumber!='null'&&user.phoneNumber!=''){
                this.pp=this.pp+20;
            }
            if(user.birthDate&&user.birthDate!='null'&&user.birthDate!=''){
                this.pp=this.pp+20;
            }
            if(user.gender&&user.gender!='null'&&user.gender!=''){
                this.pp=this.pp+20;
            }
            this.object={ 
                'width': this.pp+'%',
                'animation': 'progress-bar-stripes 2s linear infinite',
                'background-color': '#9c27b0'
           };
            if(!user.gender||user.gender!='null'){
                $('.selectpicker').selectpicker('val',user.gender.toLocaleLowerCase());
            }
           
            $('.datepicker').datetimepicker({
                format: 'YYYY/MM/DD',
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove',
                    inline: true
                }
             });
             // Prepare the preview for profile picture
        $("#wizard-picture").change(function(){
            
                        let input=this;
                        if (input.files && input.files[0]) {
                            var reader = new FileReader();
                
                            reader.onload = function (e:FileReaderEvent) {
                                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                            }
                            reader.readAsDataURL(input.files[0]);
                        }
                    });
        }
        ngOnChanges(){
            var input = $(this);
            var target:EventTarget;
            if (input.files && input.files[0]) {
                var reader:any = new FileReader();
    
                reader.onload = function (e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        updateUser(formData){
            
            console.log(formData.value);
            let user:User =this.authservice.currentUser();
            let newUser=formData.value;

            if(user.lastName=='null'){
                user.lastName=null;
            }
            if(newUser.lastname!=user.lastName)
            {
                let url="http://139.99.107.8/forum-ms-web/v0/user/updateLastname?lastname="+newUser.lastname;
                let headers = new Headers();
                headers.append('Authorization', 'Bearer '+user.token);
                let options = new RequestOptions({ headers: headers });
                this.dataService.update(url,null,options).subscribe(val=>{
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your lastname updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when updateting lastname",'danger');
                    }
                   
                },err=>{
                    this.showNotification("error when updateting lastname",'danger');
                });

            }



            if(user.gender=='null'){
                user.gender=null;
            }
            if(newUser.gender=="")
            {}
            else if(user.gender)
            {
                if(newUser.gender!=user.gender.toLocaleLowerCase){
                    let url="http://139.99.107.8/forum-ms-web/v0/user/updateGender?userGender="+newUser.gender.toLocaleUpperCase();
                    let headers = new Headers();
                    headers.append('Authorization', 'Bearer '+user.token);
                    let options = new RequestOptions({ headers: headers });
                    this.dataService.update(url,null,options).subscribe(val=>{
                        if(val.succes){
                            this.authservice.refreshUser(user.user_id,user.token);
                            this.showNotification("Your gender updated successfuly",'success');
                        }else
                        {
                            this.showNotification("error when updateting gender",'danger');
                        }
                       
                    },err=>{
                        this.showNotification("error when updateting gender",'danger');
                    });
                }
                

            }
            else{
                let url="http://139.99.107.8/forum-ms-web/v0/user/updateGender?userGender="+newUser.gender.toLocaleUpperCase();
                let headers = new Headers();
                headers.append('Authorization', 'Bearer '+user.token);
                let options = new RequestOptions({ headers: headers });
                this.dataService.update(url,null,options).subscribe(val=>{
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your gender updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when updateting gender",'danger');
                    }
                   
                },err=>{
                    this.showNotification("error when updateting gender",'danger');
                });
            }

            if(user.birthDate=='null'){
                user.birthDate=null;
            }
            
            
           if($('.datepicker').val()=="")
            newUser.birthdate=null
           else
           newUser.birthdate=$('.datepicker').val();
            if(newUser.birthdate!=user.birthDate)
            {
                let url="http://139.99.107.8/forum-ms-web/v0/user/updateBirthDate?BirthDate="+newUser.birthdate;
                let headers = new Headers();
                headers.append('Authorization', 'Bearer '+user.token);
                let options = new RequestOptions({ headers: headers });
                this.dataService.update(url,null,options).subscribe(val=>{
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your birthdate updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when updateting birthdate",'danger');
                    }
                   
                },err=>{
                    this.showNotification("error when updateting birthdate",'danger');
                });

            }
            
            if(user.phoneNumber=='null'){
                user.phoneNumber=null;
            }
            if(newUser.phonenumber!=user.phoneNumber)
            {
                let url="http://139.99.107.8/forum-ms-web/v0/user/updatePhoneNumber?phoneNumber="+newUser.phonenumber;
                let headers = new Headers();
                headers.append('Authorization', 'Bearer '+user.token);
                let options = new RequestOptions({ headers: headers });
                this.dataService.update(url,null,options).subscribe(val=>{
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your phone number updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when updateting phone number",'danger');
                    }
                   
                },err=>{
                    this.showNotification("error when updateting phone number",'danger');
                });

            }
            if(user.firstName=='null'){
                user.firstName=null;
            }
            if((newUser.firstname!=user.firstName))
            {
                let url="http://139.99.107.8/forum-ms-web/v0/user/updateFirstname?firstname="+newUser.firstname;
                let headers = new Headers();
                headers.append('Authorization', 'Bearer '+user.token);
                let options = new RequestOptions({ headers: headers });
                this.dataService.update(url,null,options).subscribe(val=>{
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your firstname updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when updateting firstname",'danger');
                    }
                },err=>{
                    this.showNotification("error when updateting firstname",'danger');
                });

            }


            let file=$('#wizard-picture')[0].files[0];
            if (typeof(file) !== 'undefined') {
                let data = new FormData();
                data.append('uploadedFile', file);
                data.append('id', user.user_id);

                let headers = new Headers();
                headers.set('Accept', 'application/json');

                let options = new RequestOptions({ headers: headers });
                let url="http://139.99.107.8/forum-ms-web/v0/user/changePicture";
                
                this.dataService.Create(url,data,options)
                .subscribe(val=>{
                    $('#wizard-picture').val("");
                    if(val.succes){
                        this.authservice.refreshUser(user.user_id,user.token);
                        this.showNotification("Your picture updated successfuly",'success');
                    }else
                    {
                        this.showNotification("error when uploading picture to the server",'danger');
                    }
                },err=>{
                    this.showNotification("error when uploading picture to the server",'danger');
                });
            }
            
            this.pp=0;
            let user2:User=this.authservice.currentUser();
            if(user2.firstName&&user2.firstName!='null'&&user2.firstName!=''){
                this.pp=this.pp+20;
            }
            if(user2.lastName&&user2.lastName!='null'&&user2.lastName!=''){
                this.pp=this.pp+20;
            }
            if(user2.phoneNumber&&user2.phoneNumber!='null'&&user2.phoneNumber!=''){
                this.pp=this.pp+20;
            }
            if(user2.birthDate&&user2.birthDate!='null'&&user2.birthDate!=''){
                this.pp=this.pp+20;
            }
            if(user2.gender&&user2.gender!='null'&&user2.gender!=''){
                this.pp=this.pp+20;
            }
            this.object={ 
                'width': this.pp+'%',
                'animation': 'progress-bar-stripes 2s linear infinite',
                'background-color': '#9c27b0'
           };
            
        }
        showNotification(html,color){
            console.log(html);
          $.notify({
              icon: "notifications",
              message: html
      
          },{
              type:color,
              timer: 3000,
              placement: {
                  from: 'top',
                  align: 'right'
              }
          });
      
      }
        get As(){
            return this.authservice;
        }
    }
