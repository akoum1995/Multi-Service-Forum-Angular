import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';

import * as Chartist from 'chartist';

declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit{
   constructor() { }

  public ngOnInit() {
      
     

   


      

     



      
  }
      


     
          
         
   ngAfterViewInit(){
       var breakCards = true;
       if(breakCards == true){
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               var $fix_button = $(this);
               var $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   console.log(this);
                   var $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count',0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   },480);
               });

               $card.mouseenter(function(){
                   var $this = $(this);
                   var hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr("data-count", hover_count);
                   if (hover_count >= 20){
                       $(this).children('.card-header, .card-image').addClass('hinge animated');
                   }
               });
           });
       }
       //  Activate the tooltips
       $('[rel="tooltip"]').tooltip();
   }
}
