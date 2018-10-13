export class User {
    constructor(
        public user_id:string,
        public token:string,
        public email:string,
        public username:string,
        public role:string,
        public firstName:string,
        public lastName:string,
        public birthDate:string,
        public image:string,
        public phoneNumber:string,
        public gender:string,
        public points:string
    ){}
}