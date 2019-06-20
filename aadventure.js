(function(){


window.onload = function() { 
  // settings
  var metamarker = ' _'; 

  // defaults
  this.fh = 1; // frameheight
  this.hh = 0; // headerheight
  this.dh = 1; // dataheight
  this.idx = 0; // startindex
  this.fps = 3;


  // globals
  var self = this;
  var reel = document.getElementsByClassName("reel")[0].innerText.split('\n');
  var scenes = [];
  var scene = '';
  var stagenotes = [];
  /* to override any of the defaults on runtime, use metamarker on 1st line *
   * eg, override fps to 16 and frameheight to 4 with " _fps=16&fh=4"       */

  if ( reel[0].substr(0,2) === ' _' ) { 
    // meta header detected!
    idx++;
    var keyvals = reel[0].substr(2).split('&');
    for (var i = 0, l=keyvals.length; i<l; i++) { 
      var keyval = keyvals[i].split('=');
      if ( typeof self[keyval[0]] !== 'undefined' ) { 
        self[keyval[0]]=keyval[1];
      }
    }
  }

  //sanity
  this.fh = parseInt(this.fh);
  this.dh = parseInt(this.dh);
  this.hh = parseInt(this.hh);
  this.fps = parseInt(this.fps);
  
  if ( dh + hh > fh ) fh=dh+hh;
  else if ( dh + hh < fh ) dh=fh-hh;

  if ( parseInt(this.fps) < 1 ) this.fps=1;

  //grab the scenes
  for ( var i = idx, l = reel.length; i < l; i+=fh ) { 
    if ( typeof reel[i+(fh-1)] === 'undefined' ) break;
    scene = '';
    for (var x = 0; x<fh; x++) {
    	scene += reel[i+x]+'\n';
    }
    scenes[scenes.length] = scene;
  }
  var cntr = 0;
  setInterval(function() { 
        if ( cntr >= scenes.length ) cntr=0;
	document.body.innerText= scenes[cntr++];
  },(1000/this.fps));

  
}



})(window)