/*********
App Object
**********/
const app = {};
app.component = {};
app.func = {};

/********
Functions
*********/
app.func.calc_b = (p)=>{
    let cs = [];let pS = [0, 0];let pF = [1, 1];for(let i = 0; i < p.length; i += 2){cs.push( [ p[i], p[i + 1] ] );};cs.unshift(pS);cs.push(pF);let numCoords = cs.length;let cnt = {};cnt.equ1 = numCoords - 1;cnt.numLvls = numCoords - 1;cnt.lvl = 0;let equVar = [];let pvtr = [];while(cnt.lvl < cnt.numLvls){for(let i = 0; i < cnt.equ1; i++){eval(`var l${cnt.lvl}x${[i]} = null;`);eval(`var l${cnt.lvl}y${[i]} = null;`);equVar.push( [`l${cnt.lvl}x${[i]}`,`l${cnt.lvl}y${[i]}`] );};cnt.lvl ++;cnt.equ1 --;};function flc(i){let s = cnt.equVarIndex;for(let j = s; j < s + cnt.numEqu2; j++){equVar[j][0] = i * (cs[j + 1][0] - cs[j][0]) + cs[j][0];equVar[j][1] = i * (cs[j + 1][1] - cs[j][1]) + cs[j][1];cnt.equVarIndex ++;};cnt.numEqu2 --;};function rlc(i){while(cnt.equVarIndex < equVar.length){let s = cnt.equVarIndex;for(let j = s; j < (s + cnt.numEqu2); j++){equVar[j][0] = i * (equVar[cnt.equVarPrevIndex + 1][0] - equVar[cnt.equVarPrevIndex][0]) + equVar[cnt.equVarPrevIndex][0];equVar[j][1] = i * (equVar[cnt.equVarPrevIndex + 1][1] - equVar[cnt.equVarPrevIndex][1]) + equVar[cnt.equVarPrevIndex][1];cnt.equVarIndex ++;cnt.equVarPrevIndex ++;};cnt.numEqu2 --;cnt.equVarPrevIndex ++;};};for(let i = 0; i <= 1; i += 0.0001){c = (i * 10000)/10000;cnt.equVarIndex = 0;cnt.equVarPrevIndex = 0;cnt.numEqu2 = numCoords - 1;flc(c);rlc(c);pvtr.push( [ equVar[equVar.length - 1][0], equVar[equVar.length - 1][1] ] );};pvtr.push( [1, 1] );return pvtr;
};

app.func.refreshDaily = ()=>{
    let msInADay            = 86400000;
    let now_ms              = Date.now();
    let now_string          = new Date();
    let startOfToday_string = new Date(now_string.getFullYear(), now_string.getMonth(), now_string.getDate());
    let startOfToday_ms     = Date.parse(startOfToday_string);
    let nextRefresh_ms      = startOfToday_ms + msInADay+1000 - now_ms; // +1000 for 1 second into new day
    let refreshWhenNextDay  = setTimeout(()=>{
        location.reload();
    },nextRefresh_ms);
};

/*************************
Initial Function Execution
**************************/
app.func.refreshDaily();
