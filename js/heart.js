var correctCards = 0;

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

var minHearts = 3;
var maxHearts = 4;

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

  return {x, y};
}

function randomHeart(){
  return Math.floor((Math.random()*HEARTS.length));
}

///////////////////////////////////
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4 ];
  numbers.sort( function() { return Math.random() - .5 } );

  var HeartsNum = randomIntFromInterval(minHearts, maxHearts);
  for(i=1; i<=HeartsNum; i++){
    var pos = HeartPosition($('#cardPile'));
    var posx = pos['x'];
    var posy = pos['y'];
    var heart = randomHeart();
    var imgHeart = HEARTS[heart];
    //console.log(HEARTS[randomHeart()]);
    //console.log(posx + "::" + posy);

    d = document.createElement('div');
    $(d)//.addClass('canDrag')
        //.html(text)
        .appendTo($("#cardPile")) //main div
        .css({
            'display': 'block',
            'position': 'absolute',
            'top': posy + 'px',
            'left': posx + 'px',
            'width': '60px',
            'height': '60px',
            'background':"url('" + imgHeart + "')",
            'background-size': '100%'
        })
        .draggable( {
          accept: '#cardPile div',
          hoverClass: 'hovered',
          /*drop: handleCardDrop*/
        } );

        ; // css


  }

  /*
  for ( var i=0; i< numbers.length; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
  */

  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four'];
  for ( var i=1; i<=numbers.length; i++ ) {
    $('<div class=\'heart-trans\'></div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
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
