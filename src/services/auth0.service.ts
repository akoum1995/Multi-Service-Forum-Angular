import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
declare var $:any;

@Injectable()
export class Auth0Service {
    
  auth0 = new auth0.WebAuth({
    clientID: 'bxzIQa54fVd929YmVXmDcFZ2LzANJnFh',
    domain: 'ng-fms.auth0.com',
    responseType: 'token id_token',
    audience: 'https://ng-fms.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/pages/login',      
    scope: 'openid profile email'
  });
  userProfile: any;
  constructor(public router: Router,private http:Http,private datePipe: DatePipe) 
  {
    this.handleAuthentication();
  }

  public login(): void {
    this.auth0.authorize();
  }
 
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        let user :any={
            email:authResult.idTokenPayload.email,
            username:authResult.idTokenPayload.email,
            provider:authResult.idTokenPayload.sub.substring(0, authResult.idTokenPayload.sub.indexOf("|")),
            firstname:authResult.idTokenPayload.family_name,
            lastname:authResult.idTokenPayload.given_name,
            gender:authResult.idTokenPayload.gender,
            picture:authResult.idTokenPayload.picture
        }
        let url="http://139.99.107.8/forum-ms-web/v0/user/addUserAuth?"+this.toPath(user);  
        this.http.post(url,null).subscribe(resulat=>{
            if(resulat.json().user_id)
            {
                this.setConnectedUser(resulat.json().user_id,resulat.json().token)
                this.router.navigate(['/home'])
            }else if(resulat.json().error)
            {
                if("the email address is allready exist"==resulat.json().error)
                {
                    this.setConnectedUserByEmail(user.email);
                    this.router.navigate(['/home'])
                }
                
                else
                this.showNotification(resulat.json().error);
            }
        });
      } else if (err) {
        console.log(err);
      }
    });
  }
  private setConnectedUserByEmail(email){
    let url="http://139.99.107.8/forum-ms-web/v0/user/getUserByEmail/"+email;
    this.http.get(url).map(res=>{
      return res.json();
    }).subscribe(value=>{
      localStorage.setItem("user_id",value.idMember);
      localStorage.setItem("token",value.jwt);
      localStorage.setItem("email",value.email);
      localStorage.setItem("username",value.username);
      localStorage.setItem("role",value.role);
      localStorage.setItem("firstName",value.firstName);
      localStorage.setItem("lastName",value.lastName);
      localStorage.setItem("birthDate", this.datePipe.transform(value.birthDate, 'yyyy/MM/dd'));
      localStorage.setItem("image",this.traitPic(value.image));
      localStorage.setItem("phoneNumber",value.phoneNumber);
      localStorage.setItem("gender",value.gender);
      localStorage.setItem("points",value.points);
      
    });
  }
  private setConnectedUser(user_id,token){
    let url="http://139.99.107.8/forum-ms-web/v0/user/"+user_id;
    this.http.get(url).map(res=>{
      return res.json();
    }).subscribe(value=>{
      localStorage.setItem("user_id",value.idMember);
      localStorage.setItem("token",token);
      localStorage.setItem("email",value.email);
      localStorage.setItem("username",value.username);
      localStorage.setItem("role",value.role);
      localStorage.setItem("firstName",value.firstName);
      localStorage.setItem("lastName",value.lastName);
      localStorage.setItem("birthDate",this.datePipe.transform(value.birthDate, 'yyyy/MM/dd'));
      localStorage.setItem("image",this.traitPic(value.image));
      localStorage.setItem("phoneNumber",value.phoneNumber);
      localStorage.setItem("gender",value.gender);
      localStorage.setItem("points",value.points);
      
    });
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
private toPath(obj){
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
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