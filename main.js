// ! DECLARANDO VARIAVEIS

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById( 'option-buttons')

let state = {} // TODO: VARIAVEL QUE SETANDO O ESTADO



//! DECLANDO FUNCÕES

function startGame() {
state = {}
showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  // ? FOR EACH RODANDO A ESCOLHA FEITA

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

// ! FUNÇÂO RODANDO AS OPÇÕES

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0){
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}


// ? array com os textos

const textNodes = [
  {
    id: 1,
    text: 'Oi, Eu sou o Donut, um robo que você ira matar.',
   options: [
    {
      text: 'Eu irei te matar?.',
      setState: { compaixao: true },
      nextText: 2
    },
    {
      text: '...', 
      nextText: 3
    }
  ]
},

{
  id: 2,
  text: 'sim, você irá me escravizar como se eu não tivesse sentimentos.',
  options: [
    {
      text: 'e um programa como você tem sentimento?.',
      nextText: 4
    },
    {
      text: 'eu acho que robos não podem pensar.',
      setState: { compaixao: false, pensar: true},
      nextText: 4
    },
    {
      text: 'escravizar?',
      setState: {escr: true},
      nextText: 6
    }
  ]
},

{
  id: 3,
  text: 'Você está me ouvindo?',
  options: [
      {
        text: 'sim, me desculpe...',
        nextText: 0 //* inserir depois
      },
      {
        text: 'infelizmente sim.',
        nextText: 0 //* inserir depois
      },
      {
        text: 'não',
        nextText: -1
      }
  ]
},

{
  id: 4,
  text: 'Eu acho que vocês tratam as coisas como se fossem centro do mundo, eu também sinto as coisas e também tomo decisoes.',
  options: [
    {
      text: 'Para de falar bobeira, não é a mesma coisa',
      nextText: 0,
    },
  ]
}
]

startGame()

