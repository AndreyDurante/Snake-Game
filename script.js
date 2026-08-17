let cobra = [
  {x: 5, y: 5},
  {x: 4, y: 5},
  {x: 3, y: 5}
]

const cobraInicial = [
    {x: 5, y: 5},
    {x: 4, y: 5},
    {x: 3, y: 5}
];

let jogoBloqueado = false;
const botao = document.getElementById("botao")
const tabuleiro = document.getElementById("tabuleiro")
const direita = document.getElementById("direita")

const criar_cobra = (cobra) => {
    tabuleiro.innerHTML = "";
    cobra.forEach((element, index) => {
        const posicao_horizontal = (element.x * 20)
        const posicao_vertical = (element.y * 20)
        const quadrado = document.createElement("div")
        if (index === 0) {
            quadrado.classList.add("cabeca");
        }
        quadrado.classList.add("parte-cobra")
        quadrado.style.left = `${posicao_horizontal}px`
        quadrado.style.top = `${posicao_vertical}px`
        tabuleiro.appendChild(quadrado)
    });
    
}

const andar_direita = cobra =>{
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].x += 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    criar_cobra(cobra);
}

const andar_baixo = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].y += 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    criar_cobra(cobra);
};

const andar_esquerda = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].x -= 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    criar_cobra(cobra);
};

const andar_cima = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].y -= 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    criar_cobra(cobra);
};

const verificar_limite = cobra => {
    if(
        cobra[0].x < 0 ||
        cobra[0].y < 0 ||
        cobra[0].x >= 50 ||
        cobra[0].y >= 25 
    ) {
        mostrar_erro();
        tabuleiro.innerHTML = ""
    }
}

const mostrar_erro = () => {
    jogoBloqueado = true;
    cobra = cobraInicial.map(parte => ({ ...parte }));
    const mensagem_erro = document.getElementById("tela-erro")
    const contador = document.getElementById("contador");

    mensagem_erro.style.display = "flex"

    let tempo = 3;
    contador.textContent = tempo

    const intervalo = setInterval(() => {
        tempo--;

        contador.textContent = tempo;

        if (tempo === 0) {
            mensagem_erro.style.display = "none"
            clearInterval(intervalo);
            jogoBloqueado = false
        }
    }, 1000)
}

botao.addEventListener('click', () => criar_cobra(cobra));

document.addEventListener("keydown", (evento) => {

    if (jogoBloqueado) {
        return;
    }
    if (evento.key === "ArrowRight") {
        andar_direita(cobra)
        verificar_limite(cobra);
    } else if(evento.key === "ArrowDown"){
        andar_baixo(cobra)
        verificar_limite(cobra);
    } else if(evento.key === "ArrowLeft"){
        andar_esquerda(cobra)
        verificar_limite(cobra);
    } else if(evento.key === "ArrowUp"){
        andar_cima(cobra)
        verificar_limite(cobra);
    }
});
