//var c=document.getElementById("render-here");
$(document).ready(function () {
    getplacementdata(); 
   });
   
 

function getplacementdata() {
   const BASE_URL = 'http://localhost:3000/placements/recent';
   sendrequest(BASE_URL).then(function name(data) {
    // console.log(data);  
     fill_placements_template(data)  
   })
   
}

 

function fill_placements_template(data) {
    var i = 0;
    while (i < data.length) {
        var year = data[i]["year"]+"";
        var percent = data[i]["percentage"]+"%";
        
        $("#placement_update").append(`
        <div class="codeconSkillbar">
            <div class="skill-text">
                <span class="codeconSkillArea">${year}</span>
            </div>
            <div class="skillBar" data-percent=${percent}>
                <span class="PercentText">${percent}</span>
            </div>
        </div>`)
        i += 1;
    }

}

