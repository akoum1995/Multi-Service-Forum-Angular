import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from 'entities/User';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare var $:any;
@Injectable()
export class AuthentificationService 
{
private URL="http://139.99.107.8/forum-ms-web/v0/user/login?usernameOrEmail=";
  constructor(public router: Router,private http:Http,private datePipe: DatePipe) 
  {}


  refreshUser(user_id,token){
    let url="http://139.99.107.8/forum-ms-web/v0/user/"+user_id;
    this.http.get(url).map(res=>{
      return res.json();
    }).subscribe(value=>{
      localStorage.setItem("image",this.traitPic(value.image));
      localStorage.setItem("token",token);      
      localStorage.setItem("user_id",value.idMember);
      localStorage.setItem("email",value.email);
      localStorage.setItem("username",value.username);
      localStorage.setItem("role",value.role);
      localStorage.setItem("firstName",value.firstName);
      localStorage.setItem("lastName",value.lastName);
      localStorage.setItem("birthDate",this.datePipe.transform(value.birthDate, 'yyyy/MM/dd'));
      localStorage.setItem("phoneNumber",value.phoneNumber);
      localStorage.setItem("gender",value.gender);
      localStorage.setItem("points",value.points);
      
    });
  }


  login(username:string,password:string)
  {
    let url=this.URL+username+"&password="+password;
    return this.http.post(url,null).map(res=>{

      let reslt=res.json();
      if(reslt&&reslt.token){
        localStorage.setItem("token",reslt.token);
        let url="http://139.99.107.8/forum-ms-web/v0/user/"+reslt.user_id;
        this.http.get(url).map(res=>{
          return res.json();
        }).subscribe(value=>{
          localStorage.setItem("image",this.traitPic(value.image));
          localStorage.setItem("user_id",value.idMember);
          localStorage.setItem("email",value.email);
          localStorage.setItem("username",value.username);
          localStorage.setItem("role",value.role);
          localStorage.setItem("firstName",value.firstName);
          localStorage.setItem("lastName",value.lastName);
          localStorage.setItem("birthDate",this.datePipe.transform(value.birthDate, 'yyyy/MM/dd'));
          localStorage.setItem("phoneNumber",value.phoneNumber);
          localStorage.setItem("gender",value.gender);
          localStorage.setItem("points",value.points);
          
        });
      }
      
      return reslt;
    });
    
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("birthDate");
    localStorage.removeItem("image");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("gender");
    localStorage.removeItem("points");
    console.log("logout");
  }
  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token)
    return true;
    return false;
  }

  currentUser():User{
    let token=localStorage.getItem("token");
    let userId=localStorage.getItem("user_id");
    let email=localStorage.getItem("email");
    let username=localStorage.getItem("username");
    let role=localStorage.getItem("role");
    let firstName=localStorage.getItem("firstName");
    let lastName=localStorage.getItem("lastName");
    let birthDate=localStorage.getItem("birthDate");
    let image=localStorage.getItem("image");
    let phoneNumber=localStorage.getItem("phoneNumber");
    let gender=localStorage.getItem("gender");
    let points=localStorage.getItem("points");
    if(!token)
    return null;
    else{
      return new User(userId,
        token,
        email,
        username,
        role,
        firstName,
        lastName,
        birthDate,
        image,
        phoneNumber,
        gender,
        points)
    }
    
    
  }

  public addUser(email,username,password){
    let url="http://139.99.107.8/forum-ms-web/v0/user/addUser?email="
    +email+"&username="+username+"&password="+password;
    this.http.post(url,null).subscribe(resulat=>{
      if(resulat.json().user_id)
      {
          this.setConnectedUser(resulat.json().user_id,resulat.json().token)
          this.router.navigate(['/home'])
      }else if(resulat.json().error)
      {
          this.showNotification(resulat.json().error);
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
}
