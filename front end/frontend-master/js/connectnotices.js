//var c=document.getElementById("render-here");
$(document).ready(function () {
    getnoticedata(); 
   });


function getnoticedata() {
   const BASE_URL = 'http://localhost:3000/notices/recent';
   sendrequest(BASE_URL).then(function name(data) {
     //console.log(data);  
     fill_notice_template(data)  
   })
   
}

 
function fill_notice_template(data) {
    var i = 0;
    while (i < data.length) {
        var noticedata = data[i]["noticedata"];
        var noticelink = data[i]["link"];
        //add the dynamic notification to the webpage
        $("#notices_update").append(
        `<li>
        <a href=${noticelink} class="tran3s active">
        <i class="fa fa-hand-o-right"aria-hidden="true"></i>
        ${noticedata}
        </a>
        </li>
        <br>`)

        console.log("called!");
        i += 1;
    }

}
