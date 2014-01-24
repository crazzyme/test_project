$("#f1").hide();
(function() {
  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      canvas1       = document.querySelector('#canvas1'),   
      photo        = document.querySelector('#photo'),
  //    ff        = document.querySelector('#ff'),
      clik  = document.querySelector('#clik'),
 //     change=document.querySelector('#change'),
      crop=document.querySelector('#crop'),
      width = 400,
      height = 0;
  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(str) {
        if (navigator.mozGetUserMedia) {
        video.mozSrcObject = str;
        } else {     
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(str);
        }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );
  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);
  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('');
    photo.setAttribute('src', data);
  }
  clik.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();$("#f1").show();
  }, false);    
   function freeform() {
        var x1=$("#x1").val(),x2=$("#x2").val(),y1=$("#y1").val(),y2=$("#y2").val();
    var sx=x1*width/100,sy=y1*height/100,sw=width-sx-(x2*width/100),sh=height-sy-(y2*height/100);
       canvas1.width = sw;//width;
    canvas1.height = sh;//height;//*canvas1.width;
    canvas1.getContext('2d').drawImage(photo ,sx,sy,sw,sh,0, 0, sw,sh);
    var data = canvas1.toDataURL('');
        photo.setAttribute('src', data);
    }
    crop.addEventListener('click', function(evt){
        freeform();evt.preventDefault();
    },false);
})();