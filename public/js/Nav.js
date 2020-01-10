const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a, .nav-links div.g-signin2");
    let i = 1;

    // window.addEventListener('resize',()=>{nav.style.transform})
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach( (link, index) => {
            if(i % 2 == 0){
                link.style.animation = `navLinkFadeOut 0.5s ease backwards ${index/7}s`;
            } else {
                link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index/7 +0.3}s`;
            }
        })

        burger.classList.toggle("toggle");
        i++;
    })
}

navSlide();