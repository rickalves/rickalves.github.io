const btnToggler = document.querySelector("#btnToggler")
const header = document.querySelector("header")
const sobre = document.querySelector("#sobre")
const habilidades = document.querySelector("#habilidades")
const container = document.querySelector(".container")
const navbar = document.querySelector(".nav-bar > nav")

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
    threshold: [0.2],
  };
  
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fadeInEffect')
        }else{
            entry.target.classList.remove('fadeInEffect')
        }
    })
}, options)
  
  container.childNodes.forEach((elem) => {
        if(elem.nodeName !== '#text'){
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
      observer.unobserve(header)
    }else{
      navbar2.classList.remove('nav-bar-fixed')
      observer.observe(header)
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

  


  