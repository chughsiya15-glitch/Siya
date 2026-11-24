// Shared behaviour for the article / case study pages
(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){nav.classList.toggle('scrolled',scrollY>20)};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // light by default; dark only if the visitor switched it on
  var root=document.documentElement, key='sc-theme';
  try{var s=localStorage.getItem(key); if(s) root.dataset.theme=s;}catch(e){}
  document.getElementById('theme').onclick=function(){
    var dark=root.dataset.theme==='dark';
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem(key,root.dataset.theme)}catch(e){}
  };

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return; e.target.classList.add('in'); io.unobserve(e.target);
    })},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  } else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});
})();
