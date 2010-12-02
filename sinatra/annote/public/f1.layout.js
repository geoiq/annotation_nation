// Simple "Layout System" style UI for asking questions and getting answers.
// Developed for inital use in the analysis UI

if(typeof(F1)=='undefined') {F1 = {}}
(function(){
  F1.Layout = function(options) {  //constructor
    this.options = options;
    if (!options.id) {options.id = 'layout'} 
    F1.Layout.instances[options.id] = this;
    this.init()
  }
  
  F1.Layout.instances = {}
  F1.Layout.prototype = {
    
    init: function(){
      _l = this //for console debugging only, do not use in code.
      this.set_layout('e')
      
      $('.lower_tabs').tabs()
      
      $('.panel_tabs').tabs()
  
      $('.draggable_tab').draggable({
        distance: 20,
        revert: true,
        start: function() {
          $(this).parent().css('z-index',1000)        
        },
        stop: function() {
          $(this).parent().css('z-index',3)
        },
        helper: function(){
          console.log([ "this" , this ])
          // var selected = $('#dragSource input:checked').parents('li');
          // if (selected.length === 0) {
          //   selected = $(this);
          // }
          var tab_body = $( $('a',this).attr('href') )
           container = $('<div/>').attr('id', 'draggingContainer');
          container.append(tab_body)
          // container.append($(this))
          return container;
        }
      })
            
      $('.droppable_vertical').droppable({
        drop: function(event, ui) {
          // $(ui.draggable).appendTo($('.panel_tabs ul',this)).css({top:'auto',left:'auto'})
          // console.log( $(this) )
          // console.log( 'dropped' )
        }
      })
      
    },
    
    set_layout: function(layout) {
      this.layouts[layout].call(this)
    },
    
    reset_layout: function() {
      $('.ui-layout-resizer, .ui-layout-toggler').remove()
      $('.f1-layout-east, .f1-layout-west, .f1-layout-north, .f1-layout-south, .f1-layout-center').appendTo('body')
      $('.f1-holder').remove()
      $('<div class="f1-center-holder f1-holder"></div>').appendTo('body')
    },
    
    layouts: {
      
      defaults: {
        north: {
          paneSelector: '.f1-layout-north',
    			size: 84,
    			closable: false,
    			resizable: false,
    			spacing_open: 0
  		  }
      },
      
      nsew: function() {
        this.reset_layout()
        this.outer_layout = $('body').layout({
    		  defaults: {},
    		  north: this.layouts.defaults.north,
          south:  {paneSelector:  '.f1-layout-south', size: 150},
          east:   {paneSelector:  '.f1-layout-east', size: 500, resizable: true},
          west:   {paneSelector:  '.f1-layout-west', size: 226, resizable: false},
          center: {paneSelector:  '.f1-layout-center'}
    		});
      },
      
      e: function() {
        this.reset_layout()
        $('.f1-layout-west, .f1-layout-south, .f1-layout-center').appendTo('.f1-center-holder')
        this.outer_layout = $('body').layout({
          north: this.layouts.defaults.north,
          center:  {paneSelector:'.f1-center-holder'},
          east:   {paneSelector:  '.f1-layout-east', size: 500, resizable: true},
        })
        this.inner_layout = $('.f1-center-holder').layout({
          west:   {paneSelector:  '.f1-layout-west', size: 226, resizable: false},
          south:  {paneSelector:  '.f1-layout-south', size: 250},
          center: {paneSelector:  '.f1-layout-center'}
        })
      },
      
      w: function() {
        this.reset_layout()
        $('.f1-layout-east, .f1-layout-south, .f1-layout-center').appendTo('.f1-center-holder')
        this.outer_layout = $('body').layout({
          north: this.layouts.defaults.north,
          center:  {paneSelector:'.f1-center-holder'},
          west: { paneSelector: '.f1-layout-west'}
        })
        this.inner_layout = $('.f1-center-holder').layout({
          east:   {paneSelector:  '.f1-layout-east'},
          south:  {paneSelector:  '.f1-layout-south'},
          center: {paneSelector:  '.f1-layout-center'}
        })
      }
      
      
    }
    
  }  
      
})();  // preserving the global namespace
