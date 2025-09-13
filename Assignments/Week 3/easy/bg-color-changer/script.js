var buttons = document.querySelectorAll("button");
buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        document.body.style.backgroundColor=button.id;
    })
})