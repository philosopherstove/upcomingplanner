init_DOM();
async function init_DOM(){

    // Init localStorage token if not present
    // if(window.localStorage.getItem("UP") === null){
    //     let obj = {};
    //     window.localStorage.setItem("UP", JSON.stringify(obj));
    // };

    let html = `
        <div class="app">
            <div class="addPage">
                <div class="blurTile displayNone" onclick="app.component.item.func.action.submit()"></div>
                <div class="dropper" onclick="app.component.dayDropper.func.action.openDropdown()">
                    <p class="currDay_text"></p>
                    <p class="items_daysCountdown">(2 items - today)</p>
                    <div class="downArrow"></div>
                </div>
                <div class="dropdownMenu_day displayNone"></div>
                <div class="timeSlots"></div>
            </div>
            <div class="upcomingPage"></div>
            <div class="footer></div>
        </div>
    `;

    let body = document.body;
        // body.classList.add(templateObj.bodyClass);
        body.insertAdjacentHTML("afterbegin", html);

};
