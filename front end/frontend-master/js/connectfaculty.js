//var c=document.getElementById("render-here");
$(document).ready(function () {
    var filename = window.location.pathname.split("/").pop();
    var dep="";
    if (filename==="CSEteachers.html") {
        dep="CSE";
    } else if(filename==="ECEteachers.html"){
        dep="ECE";
    }
    else if(filename==="EEEteachers.html"){
        dep="EEE";
    }else if(filename==="MECteachers.html"){
        dep="MEC";
    }
    else{
        dep='placements';
    }

     getfacultydata(dep); 
    
    });

function getfacultydata(dep) {
    const BASE_URL = 'http://localhost:3000/faculty/department/'+dep;
    sendrequest(BASE_URL).then(function name(data) {
      console.log(data);  
      fill_faculty_template(data)  
    })
    
}

function fill_faculty_template(data) {
    var i = 0;
    while (i < data.length) {
        var name = data[i]["name"];
        var subject =  data[i]["workdescription"];
        var designation = data[i]["designation"];
        var imgurl =  data[i]["image"];
        var fb = data[i]["facebook"];
        var twitter = data[i]["twitter"];
        var mail = data[i]["email"];
        var linkedin = data[i]["linkedin"];
        $("#faculty_update").append(`<div class="float-left">
    <div class="single-team-member">
        <div class="img">
            <img STYLE="height: 300px;width: 360px;" src=${imgurl} alt="Image">
            <div class="opacity tran4s">
                <h4>${name}</h4>
                <span>${designation}</span>
                <p>
                    ${subject}
                </p>
            </div>
        </div> 
        <div class="member-name">
            <h6>${name}</h6>
            <p>${designation}</p>
            <ul>
                <li><a href="${fb}" class="tran3s round-border"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="${twitter}" class="tran3s round-border"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="${mail}" class="tran3s round-border"><i class="fa fa-google" aria-hidden="true"></i></a></li>
                <li><a href="${linkedin}" class="tran3s round-border"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    </div> 
    
</div>`)

        i += 1;
    }

}


