//var c=document.getElementById("render-here");
$(document).ready(function () {
    getdata(); 
   });


function getdata() {
   const BASE_URL = 'http://localhost:3000/placements/all';
   sendrequest(BASE_URL).then(function name(data) {
     console.log(data);  
     fill_notice_template(data)  
   })
   
}

const sendrequest = async (BASE_URL) => {
   try {
     const res = await axios.get(`${BASE_URL}`);
     const data = res.data;
     return data;
   } catch (e) {
   
     console.error(".......AN ERROR OCCURED IN REQUEST.........\n",e);
     return e;
   }

 };

 
 
function fill_notice_template(params) {
    var i = 0;
    while (i < 5) {
        var noticedata = "this is data";
        var noticelink = "https://docs.google.com/document/d/1umdOCK2_qWoMORNwcdb09BNnQMxccIY2m_dGBK_kY-8/edit";
        //add the dynamic notification to the webpage
        $("#notice_update").append(
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
