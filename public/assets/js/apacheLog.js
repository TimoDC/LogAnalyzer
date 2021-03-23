"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){    
    checkforResponse();
}

function checkforResponse(){
    if(typeof promise === "undefined"){
        setTimeout(() => {
            checkforResponse();
        }, 5000);
    }else{
        promise.then(content => {
            analyseLog(content);
        });
    }
}

function analyseLog(content){
    console.log(content);
}