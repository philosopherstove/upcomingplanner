app.component.footer = {};
app.component.footer.func = {};
app.component.footer.func.give       = {};
app.component.footer.func.init       = {};
app.component.footer.func.transition = {};

app.component.footer.func.give.pageTurnerListeners_to_pageTurnerButtons = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.addEventListener("click", app.component.footer.func.transition.toAddPage);
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.addEventListener("click", app.component.footer.func.transition.toViewPage);
};

app.component.footer.func.init.component = ()=>{
    app.component.footer.func.give.pageTurnerListeners_to_pageTurnerButtons();
};

app.component.footer.func.transition.toAddPage = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "0%";
};

app.component.footer.func.transition.toViewPage = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "-100%";
};
