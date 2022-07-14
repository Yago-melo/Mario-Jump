const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

//Cria uma condição de game over inicialmente falsa
var gameOver = false;

//Aumenta velocidade
var levelString = ["pipe-animation 2.75s infinite linear", "pipe-animation 2.5s infinite linear",
"pipe-animation 2.25s infinite linear", "pipe-animation 2s infinite linear",
"pipe-animation 1.75s infinite linear", "pipe-animation 1.5s infinite linear",
"pipe-animation 1.5s infinite linear", "pipe-animation 1.25s infinite linear",
"pipe-animation 1s infinite linear"];
var level = -1;
var pipeCount = 0;
var canChangeLevel = true;

const jump = () => {
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    //Verifica se o Mario está perto do chão para poder pular de novo
    if(marioPosition <= 5){
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const loop = setInterval(()=> {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if(!canChangeLevel) canChangeLevel = pipePosition > 200;

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left =  `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.left =  `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        
        //passa game over para true
        gameOver = true;

        clearInterval(loop);
    }
    //adiciona mais um cano à contagem e verifica se pode subir de nível
    else if(pipePosition <= 1 && canChangeLevel){
        canChangeLevel = false;
        pipeCount++;

        if(pipeCount == 5){
            pipeCount = 0;
            level++;

            if(level == levelString.length) level = levelString.length - 1;
            pipe.style.right = 0;
            pipe.style.animation = "pipe-reseted .1s infinite linear";

            setTimeout(() => {
                pipe.style.animation = levelString[level];
            }, 100);
            
        }
    }
},10);

const reset = () => {
    //checa se a condição de gameover é verdadeira
    if(gameOver){
        //reinicia jogo
        document.location.reload(true);
    }
}

document.addEventListener('keydown', jump);

document.addEventListener('keydown', reset);