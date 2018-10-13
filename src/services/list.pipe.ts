import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name:"list"
})
export class listPipe implements PipeTransform
{
    transform(value:any[], args?:string) {
            
        if(value){
            value.sort(function(a,b){
                let aa:any=new Date(a.date);
                let bb:any=new Date(b.date);
                return  aa-bb;
              });
        
              value=value.filter(obj=>{
               return ( (obj.id_user_d==args) || (obj.id_user_s==args) )
                });
        
            }
        
          return value;

        
    }


   
}