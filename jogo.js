console.log("[Dev Leo] Flappy bird");

let frames = 0;
const som_Hit = new Audio();
som_Hit.src = './uepa.mp3';

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//Fundo
const PlanoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
            PlanoDeFundo.largura, PlanoDeFundo.altura,
            PlanoDeFundo.x, PlanoDeFundo.y,
            PlanoDeFundo.largura, PlanoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
            PlanoDeFundo.largura, PlanoDeFundo.altura,
            (PlanoDeFundo.x + PlanoDeFundo.largura), PlanoDeFundo.y,
            PlanoDeFundo.largura, PlanoDeFundo.altura,
        );
    },
};

//O chao

function CriarChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoChao = 1;
            const repet = chao.largura / 2;
            const movimentacao = chao.x - movimentoChao;

            ///
            chao.x = movimentacao % repet;
        },

        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
}

function Acolisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBird >= chaoY) {
        return true;
    }
    return false;
}


function criarFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (Acolisao(flappyBird, globais.chao)) {
                console.log("Bateu");
                som_Hit.play();

                mudarParaTela(Telas.GAME_OVER);
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, },
            { spriteX: 0, spriteY: 26, },
            { spriteX: 0, spriteY: 52, },
            { spriteX: 0, spriteY: 26, },
        ],

        frameAtu: 0,
        atualizaOframe() {
            const intervaloDeFrame = 10;
            const PassoOInter = frames % intervaloDeFrame === 0;

            ////////

            if (PassoOInter) {
                const AbaseDoIncre = 1;
                const incremento = AbaseDoIncre + flappyBird.frameAtu;
                const Repete = flappyBird.movimentos.length;
                flappyBird.frameAtu = incremento % Repete
            }

        },
        desenha() {
            flappyBird.atualizaOframe();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtu];


            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;
}


const mensageGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensageGetReady.sX, mensageGetReady.sY,
            mensageGetReady.w, mensageGetReady.h,
            mensageGetReady.x, mensageGetReady.y,
            mensageGetReady.w, mensageGetReady.h
        );
    }
}

const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    }
}


function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // [Cano do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                // [Cano do Chão]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                console.log('Passou 100 frames');
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }



            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if (canos.temColisaoComOFlappyBird(par)) {
                    console.log('Você perdeu!')
                    som_Hit.play();
                    mudarParaTela(Telas.GAME_OVER);
                    return;
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });

        }
    }

    return canos;
}


function CriarPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '45px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'purple';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);

        },
        atualiza() {
            const intervaloDeFrame = 20;
            const PassoOInter = frames % intervaloDeFrame === 0;

            if (PassoOInter) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
}

// [tela]

const globais = {};
let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criarFlappyBird();
            globais.chao = CriarChao();
            globais.canos = criaCanos();
        },
        desenha() {
            PlanoDeFundo.desenha()
            globais.flappyBird.desenha();

            globais.chao.desenha();
            mensageGetReady.desenha();
        },
        click() {
            mudarParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa() {
        globais.placar = CriarPlacar();
    },
    desenha() {
        PlanoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },

    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudarParaTela(Telas.INICIO);
    }
}

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudarParaTela(Telas.INICIO);
loop();