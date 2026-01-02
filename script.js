document.addEventListener("DOMContentLoaded", ()=>{

    document.body.classList.add("page-loaded");

    updateTime();

    const current = window.location.pathname.split("/").pop();
    document.querySelectorAll(".menu a").forEach(a=>{
        if(a.getAttribute("href")===current){
            a.classList.add("active");
        }
    });

    const btn=document.createElement("button");
    btn.innerHTML="↑";
    btn.className="top-btn";
    document.body.appendChild(btn);

    window.addEventListener("scroll",()=>{
        btn.style.display = window.scrollY>250 ? "block" : "none";
    });

    btn.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});

    const cards=document.querySelectorAll(".card");
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    });

    cards.forEach(card=>observer.observe(card));

    const lightbox=document.createElement("div");
    lightbox.className="lightbox";
    const img=document.createElement("img");
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    document.querySelectorAll(".card img").forEach(i=>{
        i.addEventListener("click",()=>{
            img.src=i.src;
            lightbox.style.display="flex";
        });
    });

    lightbox.onclick=()=>lightbox.style.display="none";
});


function updateTime(){

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2,"0");

    let greet = "";

    if(h<12) greet="Selamat Pagi ☀️";
    else if(h<15) greet="Selamat Siang 🌤";
    else if(h<18) greet="Selamat Sore 🌇";
    else greet="Selamat Malam 🌙";

    let el = document.getElementById("timeText");
    if(!el) return;

    el.innerHTML = greet+" — "+h+":"+m;
}

setInterval(updateTime,1000);
updateTime();
