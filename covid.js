var seed = document.location.hash.split("#")[1]
var cheese = false;
if(seed === undefined){
  seed = window.location.search.split("?seed=")[1]
}

function run(seed){
var illoElem = document.querySelector('.illo');
var illoSize = 64;
var minWindowSize = Math.min( window.innerWidth, window.innerHeight );
var zoom = Math.floor( minWindowSize / illoSize );
illoElem.setAttribute( 'width', illoSize * zoom );
illoElem.setAttribute( 'height', illoSize * zoom );

var isSpinning = true;
var TAU = Zdog.TAU;

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

// colors
var yellow = '#ED0';
// var gold = '#EA0';
var orange = '#E62';
var magenta = '#C25';
// var navy = '#249';
var beige = '#FEC';
var blue = '#8AD';
// Color Pallets

colorpicker = contagium = Math.random() ;
contagium = Math.random() / 10;
var color;

if (colorpicker < .2){
  var colorWheel = ["#c7fbfa", "#9be0e0", "#75bdbd",]
  color = "alien";
}else if (colorpicker < .4){
  var colorWheel =["#7da269","#5e7153"] 
  color = "zombie";
} else if ( colorpicker < .6){
  var colorWheel =['#a88c6b','#6a563f','#846f56'] 
  color = "ape";
}else if (colorpicker < .8){
  var colorWheel  = ['#feeab6','#c84e31','#fe9650','#ffb508']
  color = "pizza";
} else{
  var colorWheel = [ beige, magenta, orange, blue, yellow ];
  color = "normal";
}



// ----- model ----- //
new Zdog.Shape({
  addTo: illo,
  // no path set, default to single point
  stroke: 33,
  color: "#000000",
});

// top & bottom
var cone = new Zdog.Cone({
  diameter: 8,
  length: 10,
  addTo: illo,
  translate: { y: -16 },
  // scale: { x: 2, y: 2 },
  rotate: { x: TAU/4 },
  color: colorWheel[1],
  backface: colorWheel[0],
  stroke: false,
 
});
cone.copy({
  translate: { y: 16 },
  rotate: { x: -TAU/4 },
});



[ -1, 1 ].forEach( function( ySide ) {
  for ( var i=0; i < 5; i++ ) {
    var rotor1 = new Zdog.Anchor({
      addTo: illo,
      rotate: { y: TAU/5 * i },
    });
    var rotor2 = new Zdog.Anchor({
      addTo: rotor1,
      rotate: { x: TAU/6 },
     
    });

    cone.copy({
      addTo: rotor2,
      translate: { y: 16*ySide },
      rotate: { x: -TAU/4*ySide },
      color: colorWheel[i],
    //  backface: colorWheel[ (i+7) % 5 ],
    });
  }
});

[ -1, 1 ].forEach( function( ySide ) {
  for ( var i=0; i < 5; i++ ) {
    var rotor1 = new Zdog.Anchor({
      addTo: illo,
      rotate: { y: TAU/5 * (i+0.5) },
    });
    var rotor2 = new Zdog.Anchor({
      addTo: rotor1,
      rotate: { x: TAU/10 },
    });

    cone.copy({
      addTo: rotor2,
      translate: { y: -16*ySide },
      rotate: { x: TAU/4*ySide },
      color: colorWheel[ (i+3) % 5 ],
      backface: colorWheel[i],
    });
  }
});

[ -1, 1 ].forEach( function( ySide ) {
  for ( var i=0; i < 5; i++ ) {
    var rotor1 = new Zdog.Anchor({
      addTo: illo,
      rotate: { y: TAU/5 * (i+0.5) },
    });
    var rotor2 = new Zdog.Anchor({
      addTo: rotor1,
      rotate: { x: TAU/4.5 },
    });

    cone.copy({
      addTo: rotor2,
      translate: { y: -16*ySide },
      // scale: { y: -1 },
      rotate: { x: TAU/4*ySide },
      color: colorWheel[ (i+1) % 5 ],
      backface: colorWheel[ (i+4) % 5 ],
    });
  }
});


// -- animate --- //

var keyframes = [
  { x: TAU * 0,   y: TAU * 0 },
  { x: TAU * 1/2, y: TAU * -1/2 },
  { x: TAU * 1,   y: TAU * -1 },
];

var ticker = 0;
var cycleCount = 180;

function animate() {
  spin();
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();
console.log(contagium);
console.log(color);

// -- update -- //

function spin() {
  if ( !isSpinning ) {
    return;
  }
  var progress = ticker / cycleCount;
  var tween = Zdog.easeInOut( progress % 1, 3 );
  var turnLimit = keyframes.length - 1;
  var turn = Math.floor( progress % turnLimit );
  var keyA = keyframes[ turn ];
  var keyB = keyframes[ turn + 1 ];
  var thetaX = Zdog.lerp( keyA.x, keyB.x, tween );
  // illo.rotate.x = Math.cos( thetaX ) * TAU/12;
  // illo.rotate.y = Zdog.lerp( keyA.y, keyB.y,      tween )
  illo.rotate.y +=  contagium
  illo.rotate.z += contagium
  illo.rotate.x +=  contagium ;
  ticker++;
}

}

window.addEventListener('load', (event) => {

  run(seed);
});
