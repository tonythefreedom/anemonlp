import {Directive, ElementRef, OnInit} from '@angular/core';
declare var $:any;  //<-- let typescript compiler know your referencing a var that was already declared

@Directive({
    selector: 'scrollbar',
    host: {'class':'mCustomScrollbar'},  //<-- Make sure you add the class
})
export class ScrollbarDirective implements OnInit {
    el: ElementRef;
    constructor(el:ElementRef) {
        this.el = el;
    }
    ngOnInit() {
        //$(function(){ console.log('Hello'); }); <--TEST JQUERY
        //check if your plugins are loading
        //$().mousewheel) ? console.log('mousewheel loaded') : console.log('mousewheel not loaded');
        //$().mCustomScrollbar) ? console.log('mCustomScrollbar loaded') : console.log('mCustomScrollbar not loaded');

        // $(this.el.nativeElement).mCustomScrollbar({
        //     autoHideScrollbar: false,
        //     theme: "light",
        //     advanced: {
        //         updateOnContentResize: true
        //     }
        // });
    }
}