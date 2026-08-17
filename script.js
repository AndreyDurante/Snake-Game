const cobra = [
  {x: 5, y: 5},
  {x: 4, y: 5},
  {x: 3, y: 5}
]


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



botao.addEventListener('click', () => criar_cobra(cobra));

document.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowRight") {
        andar_direita(cobra)
    } else if(evento.key === "ArrowDown"){
        andar_baixo(cobra)
    } else if(evento.key === "ArrowLeft"){
        andar_esquerda(cobra)
    } else if(evento.key === "ArrowUp"){
        andar_cima(cobra)
    }
});
