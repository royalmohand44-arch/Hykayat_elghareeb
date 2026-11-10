export function initHome(){if(document.body.dataset.page!=='index')return;const cards=document.querySelectorAll('.portal-card');cards.forEach((card,i)=>card.style.setProperty('--card-order',i))}
