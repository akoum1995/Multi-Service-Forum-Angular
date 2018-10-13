import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'services/data.service';


@Component({
    moduleId: module.id,
    selector: 'list-group-cmp',
    templateUrl: 'listgroup.component.html'
    
    })

    export class ListGroupComponent{ 
        myArr = [];
        
                constructor(private activatedRoute: ActivatedRoute,private ds:DataService)
        {
            
        }
        ngOnInit() {
            let url="http://139.99.107.8/forum-ms-web/v0/group/getAllGroups";
            this.ds.getAll(url).subscribe(val=>{
                this.myArr=val;
            });
            
        }
        deletegroup(group){
            let index = this.myArr.indexOf(group);
            this.myArr.splice(index, 1);
        }
        
    }
