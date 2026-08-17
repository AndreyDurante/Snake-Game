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
const div_maca = document.getElementById("div-maca")
const div_cobra = document.getElementById("div-cobra")


let macaX = Math.floor(Math.random() * 50)
let macaY = Math.floor(Math.random() * 25)

let macas_comidas = 0
const quadrado_maca = document.createElement("div")
const div_contador_macas = document.getElementById("div-contador-macas")
const contador_macas = document.createElement("h6")
contador_macas.textContent = `Maçãs comidas: ${macas_comidas}`
div_contador_macas.appendChild(contador_macas);

const criar_cobra = (cobra) => {
    console.log("criar_cobra foi chamada");
    console.log(div_cobra);

    div_cobra.innerHTML = "";
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
        div_cobra.appendChild(quadrado)
    });
    
}

const andar_direita = cobra =>{
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].x += 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    if (verificar_corpo(cobra)){
        return;
    }

    criar_cobra(cobra);
    comer_maca(cobra);
}

const andar_baixo = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

     cobra[0].y += 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    if (verificar_corpo(cobra)){
        return;
    }

    criar_cobra(cobra);
    comer_maca(cobra);

};

const andar_esquerda = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].x -= 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

   if (verificar_corpo(cobra)){
        return;
    }

    criar_cobra(cobra);
    comer_maca(cobra);
};

const andar_cima = (cobra) => {
    const cobraAntiga = cobra.map(parte => ({ ...parte }));

    cobra[0].y -= 1;

    for (let i = 1; i < cobra.length; i++) {
        cobra[i].x = cobraAntiga[i - 1].x;
        cobra[i].y = cobraAntiga[i - 1].y;
    }

    if (verificar_corpo(cobra)){
        return;
    }

    criar_cobra(cobra);
    comer_maca(cobra);
};

const criar_maca = () => {
    quadrado_maca.classList.add("maca")
    quadrado_maca.innerHTML = `<img src="./img/images.jpeg" alt="maca">`
    quadrado_maca.style.left = `${macaX * 20}px`
    quadrado_maca.style.top = `${macaY * 20}px`
    div_maca.appendChild(quadrado_maca)
}

const comer_maca = (cobra) =>{
    if (cobra[0].x === macaX && cobra[0].y === macaY){
        const maca = document.getElementsByClassName("maca")[0]
        macas_comidas += 1
        contador_macas.textContent = `Maçãs comidas: ${macas_comidas}`
        maca.style.display = "none"
        gerar_posicao_maca()
        maca.style.display = "flex"
        const cobraAntiga = cobra.map(parte => ({ ...parte }));
        cobra.push(
            {x: cobraAntiga[cobra.length -1].x, y: cobraAntiga[cobra.length -1].y}
        )
        criar_cobra(cobra)
    }
    
}

const gerar_posicao_maca = () => {
    macaX = Math.floor(Math.random() * 50)
    macaY = Math.floor(Math.random() * 25)
    quadrado_maca.style.left = `${macaX * 20}px`
    quadrado_maca.style.top = `${macaY * 20}px`
}

const verificar_corpo = (cobra) => {
    let cabeca = cobra[0]
    for (let i = 1; i <cobra.length; i++){
        if (cabeca.x === cobra[i].x &&
            cabeca.y === cobra[i].y
        ) {
            mostrar_erro()
            return true
        }
    }
    return false
}

const verificar_limite = cobra => {
    if(
        cobra[0].x < 0 ||
        cobra[0].y < 0 ||
        cobra[0].x >= 50 ||
        cobra[0].y >= 25 
    ) {
        mostrar_erro();
    }
}

const mostrar_erro = () => {
    jogoBloqueado = true;
    macas_comidas = 0;
    contador_macas.textContent = `Maçãs comidas: ${macas_comidas}`;
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
            cobra = cobraInicial.map(parte => ({ ...parte }));
            criar_cobra(cobra)
            criar_maca()
            jogoBloqueado = false
        }
    }, 1000)
}

botao.addEventListener('click', () => {
    criar_cobra(cobra);
    criar_maca()});

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
