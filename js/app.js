const btnToggler = document.querySelector("#btnToggler")
const btnEnviar = document.querySelector("#enviar")
const header = document.querySelector("header")
const sobre = document.querySelector("#sobre")
const projetos = document.querySelector("#projetos")
const projetosCard = document.querySelectorAll("#projetos .projeto")
const habilidades = document.querySelector("#habilidades")
const contatos = document.querySelector("#contatos")
const container = document.querySelector(".container")
const navbar = document.querySelector(".nav-bar > nav")
const logoImg = document.querySelector(".logo img")
const formulario = document.querySelector("form")


//Botão toggle
navbar.style.display = ''
btnToggler.onclick = (e) => {
  navbar.classList.toggle('scaleEffect')
  btnToggler.classList.toggle('change')

  if (navbar.style.display === 'none' || navbar.style.display === '') {
    navbar.style.display = 'flex'
  } else {
    navbar.style.display = 'none'
  }
}

//Controle de scroll com Observer API
const options = {
  /* Configuração default.  */
  root: null,
  rootMargin: "0px",
  threshold: [0],
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeInEffect')
    }
    else {
      entry.target.classList.remove('fadeInEffect')
    }
  })
}, options)

container.childNodes.forEach((elem) => {
  if (elem.nodeName !== '#text' && elem.nodeName !== 'HEADER') {
    elem.style.opacity = '0.0'
    observer.observe(elem)
  }
})

//mostra o menu caso janela seja redimencionada
document.querySelector('body').onresize = (e) => {
  if (window.innerWidth <= 768) {
    btnToggler.classList.remove('change')
    navbar.style.display = 'none'
  } else {
    btnToggler.classList.add('change')
    navbar.style.display = 'flex'
  }
}

//Função de scroll da página
document.querySelector('body').onscroll = (e) => {
  //Fecha o menu quando ocorre scroll
  if (window.innerWidth <= 768) {
    btnToggler.classList.remove('change')
    navbar.style.display = 'none'
  } else {
    btnToggler.classList.add('change')
    navbar.style.display = 'flex'
  }

  //Cria o menu fixado
  const navbar2 = document.querySelector('.nav-bar')
  if (window.scrollY.toFixed() >= 100) {
    navbar2.classList.add('nav-bar-fixed')
    header.style.zIndex = '1'
    logoImg.src = './assets/img/logo-black.png'
  } else {
    navbar2.classList.remove('nav-bar-fixed')
    logoImg.src = './assets/img/logo-yellow.png'
  }

  mostraInfo(false, 'red', 'Preencha todos os campos')
}

sobre.childNodes.forEach((elem) => {
  if (elem.nodeName !== '#text') {
    elem.style.opacity = '0.0'
    observer.observe(elem)
  }
})

habilidades.childNodes.forEach((elem) => {
  if (elem.nodeName !== '#text') {
    elem.style.opacity = '0.0'
    observer.observe(elem)
  }
})

projetos.childNodes.forEach((elem) => {
  if (elem.nodeName !== '#text') {
    elem.style.opacity = '0.0'
    observer.observe(elem)
  }
})

contatos.childNodes.forEach((elem) => {
  if (elem.nodeName !== '#text') {
    elem.style.opacity = '0.0'
    observer.observe(elem)
  }
})

/**------------Efeitos cards projetos---------------*/
projetosCard.forEach(card => {
  const cardChildren = Array.from(card.children)
  const cardInfo = cardChildren.at(cardChildren.length - 1)
  card.onmouseenter = (e) => {
    cardInfo.style.display = 'flex'
    cardInfo.style.animation = 'showCardInfo 0.7s ease-in normal'
  }
  card.onmouseleave = (e) => {
    // cardInfo.style.animation = 'showCardInfo 1.2s ease-out 2 reverse'
    cardInfo.style.display = 'none'
  }
})

/**-------------------API de envio de email-------------------*/
btnEnviar.onclick = (e) => {
  const formData = new FormData(formulario);
  const emailContent = {
    Host: "smtp.gmail.com",
    Username: "henryworkdev.ti@gmail.com",
    Password: "rjxfybpluhgrgptp",
    To: 'henryworkdev.ti@gmail.com',
    From: `${formData.get('nome')} <${formData.get('email')}>`,
    Subject: `Website Mail:${formData.get('assunto')}`,
    Body: formData.get('mensagem')
  }
  const valido = validaForm(formulario)
  console.log(valido)
  if (valido) {
    limparForm(formulario)
    mostraInfo(valido, 'sucesso', 'Email enviado!')
    console.log('enviando')
    Email.send({ ...emailContent })
      .then(
          message => console.log(message)
      );
  }

}


/**----------------Valida Form----------------- */
function validaForm(form) {
  const formData = new FormData(form)
  let valido = true
  for (let field of formData.entries()) {
    if (field.at(1).trim() === '') {
      valido = false
    }
  }
  mostraInfo(!valido, 'red', 'Preencha todos os campos')
  return valido
}

function mostraInfo(status, cor, mess) {
  const span = document.createElement('span')
  const texto = document.createTextNode(`${mess}`)
  span.appendChild(texto)

  span.style.border = '1px solid'
  span.style.borderColor = (cor === 'sucesso') ? 'green' : 'red'
  span.style.color = (cor === 'sucesso') ? 'green' : 'red'
  span.style.padding = '10px 30px'
  span.style.display = 'block'
  span.style.textAlign = 'center'
  span.style.marginBottom = '20px'
  if (formulario.firstChild.nodeName === span.nodeName) {
      formulario.removeChild(formulario.firstChild)
  }

  if (status) {
    formulario.insertBefore(span, formulario.firstChild)
  }
}

function limparForm(form){
  form.nome.value = ''
  form.email.value = ''
  form.assunto.value = ''
  form.mensagem.value = ''
}
