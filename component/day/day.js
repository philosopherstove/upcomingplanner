/*
day obj structure
=================

{
    day_ms: 445345353245,
    day_text: "Sun Oct 13",
    hourSlots: [];
        {
            hour_text: "1",
            item : {
                text: "",
                min:
            }
        },
        {
            hour_text: "2",
            item : {
                text: "",
                min:
            }
        }
}
*/

/********
component
*********/
UP.component.day = {};

/******
setting
*******/
UP.component.day.setting = {};
UP.component.day.setting.timing = {};
UP.component.day.setting.timing.controlPoints = [0.20, 0.70, 0.70, 0.20];
UP.component.day.setting.timing.ratios        = [];

/****
state
*****/
UP.component.day.state = {};
UP.component.day.state.selected = [false, null];

/******
objects
*******/
UP.component.day.objs = [];

/********
functions
*********/
UP.component.day.func = {};

UP.component.day.func.factory = (input)=>{
};

UP.component.day.func.init_component = ()=>{
    // factory
    // timing ratios

    // UP.component.day.func.get_dayData()
    // GET DATA
    // for now, get from localStorage. Later, from server/DB.
    // let data = window.localStorage.getItem("UP"); // get data

    // day not undefined => process data in factory
    if(data.day === undefined){
        // empty inserts for DOM
    }
    else{
        // factory(converts input dayData to create day objects on day component.
        // Loop them and fill in relevant timeSlots.
    }
};
