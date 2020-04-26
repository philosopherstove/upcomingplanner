app.component.pageTurner = {};
app.component.pageTurner.func = {};
app.component.pageTurner.func.give       = {};
app.component.pageTurner.func.init       = {};

/*
func hotkeys:
GIVE
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.pageTurnerListeners_toFooterButtons = ()=>{
app.component.pageTurner.func.give.pagesSlide_addPageAttributes = ()=>{
app.component.pageTurner.func.give.pagesSlide_viewPageAttributes = ()=>{
INIT
app.component.pageTurner.func.init.component = ()=>{
*/

/***
GIVE
****/
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.classList.add("pageButton_off");
        addPageButton.classList.remove("pageButton_on");
};

app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.classList.add("pageButton_on");
        addPageButton.classList.remove("pageButton_off");
};

app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.classList.add("pageButton_off");
        viewPageButton.classList.remove("pageButton_on");
};

app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.classList.add("pageButton_on");
        viewPageButton.classList.remove("pageButton_off");
};

app.component.pageTurner.func.give.pageTurnerListeners_toFooterButtons = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.addEventListener(
            "click",
            app.component.pageTurner.func.give.pagesSlide_addPageAttributes,
            app.component.pageTurner.func.give.addPageButton_onPageAttributes,
            app.component.pageTurner.func.give.viewPageButton_offPageAttributes
        );
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.addEventListener(
            "click",
            app.component.pageTurner.func.give.pagesSlide_viewPageAttributes,
            app.component.pageTurner.func.give.addPageButton_offPageAttributes,
            app.component.pageTurner.func.give.viewPageButton_onPageAttributes
        );
};

app.component.pageTurner.func.give.pagesSlide_addPageAttributes = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "0%";
};

app.component.pageTurner.func.give.pagesSlide_viewPageAttributes = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "-100%";
};

/***
INIT
****/
app.component.pageTurner.func.init.component = ()=>{
    app.component.pageTurner.func.give.pageTurnerListeners_toFooterButtons();
};
