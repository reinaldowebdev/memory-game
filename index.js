function createCards(verse, images) {
    let cards = [];
      for(let key in images) {
        var card = jQuery('<div />', {
        class: 'card',
        html: `
            <div class="card-inner">
                <div class="front">
                    <img class="card-image" src="${images[key]}">
                </div>
                <div class="back">
                    <img class="card-image" src="${verse}">
                </div>
            </div>
        `,
        'data-group': key,
      });
      let cloneCard = card.clone();
      cloneCard.attr('data-id', 2);
      cards.push(card, cloneCard);
    }
    return cards;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        // let x = array[i];
        // array[i] = array[j];
        // array[j] = x;
    }
    return array;
}

function compareGroup() {
    let activeCards = jQuery('#game .card .active');
    if (jQuery(activeCards[0].closest('.card')).data('group') === jQuery(activeCards[1].closest('.card')).data('group')) {
        activeCards.each((index) => {
            jQuery(activeCards[index]).addClass('match')
                .removeClass('active');
        });
    } else {
        activeCards.each((index) => {
            const card = jQuery(activeCards[index]);
            card.removeClass('active');
        });
    }
}

function createCardEvent() {
    jQuery('.card').on('click', function(event) {
        if (jQuery(this).hasClass('.active')) {
            return;
        }
        let rotatedCards = jQuery('#game .card .active');
        if (rotatedCards.length > 1) {
            return;
        }

        let currentCard = jQuery(this);
            currentCard.attr('disabled', 'disabled');
            currentCard.find('.card-inner')
                .addClass('active');

        if (rotatedCards.length === 1){
            setTimeout(() => {
                compareGroup();
            }, 800);
        }
    });
}

function resetGame() {
    jQuery('#btn-reset').on('click', function(event) {
        jQuery(this).attr('disabled', true);
        const bodyPage = jQuery('body');
        bodyPage.find('#game').fadeOut(1500);
        setTimeout(() => {
            bodyPage.find('#loading').remove();
            bodyPage.find('#game').remove();
            startGame();
        }, 2000);
    });
}

function startGame() {
    const bodyPage = jQuery('body');
    const loading = jQuery('<div />', {
        id: 'loading',
        html: `
            <div>Embaralhando cartas</div>
            <div class="sk-folding-cube">
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
        `
    });
    bodyPage.append(loading);

    setTimeout(() => {
        const game = jQuery('<div />', {
            id: 'game',
            html: '<div id="table"></div><div><button id="btn-reset" type="button"><i class="fa fa-repeat"></i> Reset game</button></div>'
        });
        let verse;
        let images = {};
        let cards = createCards(verse, images);
        let shuffleCards = shuffleArray(cards);
        game.find('#table').append(shuffleCards);
        loading.fadeOut(500);
        setTimeout(() => {
            bodyPage.prepend(game)
                .hide()
                .fadeIn(2000);
            createCardEvent();
            resetGame();
        }, 1000);
    }, 2000);
}

startGame();
