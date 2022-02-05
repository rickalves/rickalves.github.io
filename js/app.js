const btnToggler = document.querySelector("#btnToggler")
const header = document.querySelector("header")
const sobre = document.querySelector("#sobre")
const projetos = document.querySelector("#projetos")
const projetosCard = document.querySelectorAll("#projetos .projeto")
const habilidades = document.querySelector("#habilidades")
const contatos = document.querySelector("#contatos")
const container = document.querySelector(".container")
const navbar = document.querySelector(".nav-bar > nav")
const logoImg = document.querySelector(".logo img")

//Botão toggle
navbar.style.display = ''
 btnToggler.onclick = (e) => {  
    navbar.classList.toggle('scaleEffect')
    btnToggler.classList.toggle('change')

    if(navbar.style.display === 'none' ||  navbar.style.display === ''){
      navbar.style.display = 'flex'
    }else{
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
        if(entry.isIntersecting){
            entry.target.classList.add('fadeInEffect')
        }
        else{
            entry.target.classList.remove('fadeInEffect')
        }
    })
}, options)
  
  container.childNodes.forEach((elem) => {
        if(elem.nodeName !== '#text' && elem.nodeName !== 'HEADER'){
           console.log(elem.nodeName)
           elem.style.opacity = '0.0'
           observer.observe(elem)
        }      
  })
  
  //mostra o menu caso janela seja redimencionada
  document.querySelector('body').onresize = (e) => {
    if(window.innerWidth <= 768){
      btnToggler.classList.remove('change')
      navbar.style.display = 'none'
    }else{
      btnToggler.classList.add('change')
      navbar.style.display = 'flex'
    }
  }

  //Função de scroll da página
document.querySelector('body').onscroll = (e) => {
  //Fecha o menu quando ocorre scroll
  if(window.innerWidth <= 768){
      btnToggler.classList.remove('change')
      navbar.style.display = 'none'
    }else{
      btnToggler.classList.add('change')
      navbar.style.display = 'flex'
    }
   
    //Cria o menu fixado
    const navbar2 = document.querySelector('.nav-bar')
    if(window.scrollY.toFixed() >= 100){
      navbar2.classList.add('nav-bar-fixed')
      header.style.zIndex = '1'
      logoImg.src = './assets/img/logo-black.png'
    }else{
      navbar2.classList.remove('nav-bar-fixed')
      logoImg.src = './assets/img/logo-yellow.png'
    }  
}

sobre.childNodes.forEach((elem) => {
  if(elem.nodeName !== '#text'){
          elem.style.opacity = '0.0'
          observer.observe(elem)
      } 
})

habilidades.childNodes.forEach((elem) => {
  if(elem.nodeName !== '#text'){
      elem.style.opacity = '0.0'
      observer.observe(elem)
  }  
})

projetos.childNodes.forEach((elem) => {
  if(elem.nodeName !== '#text'){
      elem.style.opacity = '0.0'
      observer.observe(elem)
  }  
})

contatos.childNodes.forEach((elem) => {
  if(elem.nodeName !== '#text'){
      elem.style.opacity = '0.0'
      observer.observe(elem)
  }  
})

/**------------Efeitos cards projetos---------------*/

projetosCard.forEach(card => {
  const cardInfo = Array.from(card.children).at(this.length - 1)
  card.onmouseenter = (e) => {
   cardInfo.style.display = 'flex'
   cardInfo.style.animation = 'showCardInfo 0.7s ease-in normal'
  }
   card.onmouseleave = (e) => {
    // cardInfo.style.animation = 'showCardInfo 1.2s ease-out 2 reverse'
   
     cardInfo.style.display = 'none'
   
    
   }
})


  


  