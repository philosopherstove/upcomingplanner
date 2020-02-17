init_DOM();
async function init_DOM(){

    // Init localStorage token if not present
    if(window.localStorage.getItem("upcomingPlanner") === null){
        let obj = {};
            obj.items = [];
        window.localStorage.setItem("upcomingPlanner", JSON.stringify(obj));
    };

    let html = `
        <div class="app">
            <div class="addPage">
                <div class="blurTile displayNone" onclick="app.component.item.func.give.item_to_dataStore()"></div>
                <div class="dropper borderHighlight_off" onclick="app.component.dayDropper.func.transition.openDropdown()">
                    <p class="currDay_text"></p>
                    <p class="items_daysCountdown"></p>
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
        body.insertAdjacentHTML("afterbegin", html);
};
