var HEARTS = [
  'images/heart-red.png',
  'images/heart-yellow.png',
  'images/heart-purple.png',
  'images/heart-green.png',
  'images/heart-blue.png'
];

var POSITIONS = [];

var HeartSizeX = 100;
var HeartSizeY = 100;

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function HeartPosition(container /** Parent Container **/){

  var w = $(container).width();
  var h = $(container).height();

  /// Random x,y in Parent's div area
  var x = (Math.random() * (w)).toFixed();
  var y = (Math.random() * (h)).toFixed();

  POSITIONS.push([x,y]);

  /*
  if(POSITIONS.length==0){
    POSITIONS.push([x,y]);
  }else{
    isHeartOverlap(x,y);
  }
  */

  return {x, y};
}

function isHeartOverlap(newx, newy){

  for(var i =0, len = POSITIONS.length; i<len; i++){

    var pos = POSITIONS.pop();
    var x = pos[0];
    var y = pos[1];

    console.log('OLD: ' + x + ',' + y + ' / NEW: ' + newx + ',' + newy);

    //if( (newx > x && (x + HeartSizeX <= newx)) && (newy > y && (y + HeartSizeY <= newy)) ){
    //checking...
    /*
    if(){
      console.log('Overlap');
      return true;
    }else{
      console.log('Not Overlap');
      return false;
    }
    */
  }
}

function randomHeart(){
  return Math.floor((Math.random()*HEARTS.length));
}

function init(){
  var minHearts = 3;
  var maxHearts = 4;

  /// Random for number of Hearts
  var Hearts = randomIntFromInterval(minHearts, maxHearts);
  for(i=1; i<=Hearts; i++){
    var pos = HeartPosition($('#maindiv'));
    var posx = pos['x'];
    var posy = pos['y'];
    var heart = randomHeart();
    var imgHeart = HEARTS[heart];
    //console.log(HEARTS[randomHeart()]);
    //console.log(posx + "::" + posy);

    d = document.createElement('div');
    $(d).addClass('canDrag')
        //.html(text)
        .appendTo($("#maindiv")) //main div
        .css({
            'display': 'block',
            'position': 'absolute',
            'top': posy + 'px',
            'left': posx + 'px',
            'width': '60px',
            'height': '60px',
            'background':"url('" + imgHeart + "')",
            'background-size': '100%'
        }); // css


        /*
    .click(function () {
        $(this).remove();
    })
        .hide()
        .slideToggle(300)
        .delay(2500)
        .slideToggle(300)
        .queue(function () {
        $(this).remove();
        */
    //});

    //console.log($(d));

  }
}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  }

  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 10 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}

$(function(){ // document ready
  $('.canDrag').draggable({
    drop: handleDropEvent
  });
});
