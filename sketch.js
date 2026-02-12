let quotes = [ 
  // Circular Ruins
  "He wanted to dream a man; he wanted to dream him in minute entirety and impose him on reality.",//1
  "The stranger dreamed that he was in the center of a circular amphitheater which was more or less the burnt temple; clouds of taciturn students filled the tiers of seats; the faces of the farthest ones hung at a distance of many centuries and as high as the stars, but their features were completely precise.",//2
  "He dreamed an entire man--a young man, but who did not sit up or talk, who was unable to open his eyes. Night after night, the man dreamt him asleep.",//3
  "He dreamt it was alive, tremulous: it was not an atrocious bastard of a tiger and a colt, but at the same time these two firey creatures and also a bull, a rose, and a storm.", //4
  "Gradually, he began accustoming him to reality.", //5
  "With relief, with humiliation, with terror, he understood that he also was an illusion, that someone else was dreaming him.", //6

  // The Garden of Forking Paths
  "Century follows century, and things happen only in the present.", //1
  "Absurdly I held it and weighed it in my hand, to give myself courage.", //2
  "From my weakness I drew strength that never left me.", //3
  "Lost in these imaginary illusions I forgot my destiny - that of the hunted", //4
  "I leave to various future times, but not to all, my garden of forking paths.", //5

  //The Book of Sand
  "Don't  you want  to  know  something  of  my  past,  which  is  the future  awaiting  you?", //1
  "Maybe  the event  was  so  strange  I  chose  to  forget  it", //2
  "What's your  memory  like?", //3
  "The  meeting  was  real, but  the  other  man  was  dreaming  when  he  conversed with  me,  and  this  explains  how  he  was  able to  forget  me", //4
];

let links = [
  "reading1.html#R1-Q1",
  "reading1.html#R1-Q2",
  "reading1.html#R1-Q3",
  "reading1.html#R1-Q4",
  "reading1.html#R1-Q5",
  "reading1.html#R1-Q6",

  "reading2.html#R2-Q1",
  "reading2.html#R2-Q2",
  "reading2.html#R2-Q3",
  "reading2.html#R2-Q4",
  "reading2.html#R2-Q5",

  "reading3.html#R3-Q1",
  "reading3.html#R3-Q2",
  "reading3.html#R3-Q3",
  "reading3.html#R3-Q4",
  "reading3.html#R3-Q5"
  
];

let container;
let placedBoxes = [];
let hue = 0;

function setup() {
  noCanvas();
  container = select('#quote-container');

  for (let i = 0; i < quotes.length; i++) {
    let quoteDiv = createDiv(quotes[i]);
    quoteDiv.class('quote');

    // random font size (em)
    let size = random(0.7, 0.9);
    quoteDiv.style('font-size', size + 'em');

    container.child(quoteDiv);

    // place without overlap
    placeQuote(quoteDiv);

    // fade in slowly
    setTimeout(function() {
      quoteDiv.addClass('show');
    }, i * 700);

    // click to go to link
    (function(index, div){
      div.mousePressed(function() {
        window.location.href = links[index];
      });
    })(i, quoteDiv);
  }
}

function placeQuote(quoteDiv) {
  let placed = false;
  let containerRect = container.elt.getBoundingClientRect();

  while (!placed) {
    let x = random(20, containerRect.width - 200);
    let y = random(20, containerRect.height - 100);

    quoteDiv.position(x, y);

    let rect = quoteDiv.elt.getBoundingClientRect();
    placed = true;

    for (let j = 0; j < placedBoxes.length; j++) {
      let b = placedBoxes[j];
      if (rect.left < b.right &&
          rect.right > b.left &&
          rect.top < b.bottom &&
          rect.bottom > b.top) {
        placed = false;
        break;
      }
    }

    if (placed) {
      placedBoxes.push(rect);
    }
  }
}

function windowResized() {
  placedBoxes = [];

  let quotesDivs = selectAll('.quote');

  for (let i = 0; i < quotesDivs.length; i++) {
    placeQuote(quotesDivs[i]);
  }
}
