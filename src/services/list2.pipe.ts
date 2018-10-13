import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name:"list2"
})
export class list2Pipe implements PipeTransform
{
    transform(value: any[], args?:string) {
        if(args)
        {
            return value.filter(obj=>obj.name.indexOf(args)!==-1)
        }
        return value;
        
    }

}