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
            <div class="pagesSlide slideTrans" style="left:0%;">
                <div class="addPage">
                    <div class="dropper borderHighlight_off" onclick="app.component.dayDropper.func.transition.openDropdown()">
                        <p class="currDay_text"></p>
                        <p class="items_daysCountdown"></p>
                        <div class="downArrow"></div>
                    </div>
                    <div class="dropdownMenu_day displayNone">
                        <span class="scrollWrapper">
                            <span class="scrollBar">
                                <span class="scrollBall"></span>
                            </span>
                        </span>
                        <div class="dropdownMenu_innerWrapper"></div>
                    </div>
                    <div class="timeSlots"></div>
                    <div class="scrollbar_timeSlots"><span></span></div>
                </div>
                <div class="upcomingPage"></div>
            </div>
            <div class="footer">
                <div>
                    <div class="addPageButton pageButton_on">Add</div>
                    <div class="viewPageButton pageButton_off">View</div>
                </div>
            </div>
        </div>
    `;

    let body = document.body;
        body.insertAdjacentHTML("afterbegin", html);
};
