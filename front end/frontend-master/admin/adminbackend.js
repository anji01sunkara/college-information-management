function post_notice() {

    var notice = $("#notice_data").val();
    var link = $("#notice_link").val();
    var data = {
        "noticedata": notice,
        "link": link
    };
    if (notice != "" && link != "") {
        var s = sendrequest_notice("http://localhost:3000/notices", data);
    }
    else {
        console.log("in sufficient data");
    }

}

const sendrequest_notice = async (BASE_URL, reqob) => {
    console.log("inside");

    try {
        const res = await axios.post(`${BASE_URL}`, reqob);
        const data = res.data;
        return data;
    } catch (e) {

        console.error(".......AN ERROR OCCURED IN REQUEST.........\n", e);
        return e;
    }

};


function post_placement() {
    var year = $("#placement_year").val();
    var percentage = $("#placement_percent").val();
    var data = {
        "year": year,
        "percentage": percentage
    };

    if (year != "" && percentage != "") {
        var s = sendrequest_placement("http://localhost:3000/placements", data);
    }
    else {
        console.log("in sufficient data");
    }
}

const sendrequest_placement = async (BASE_URL, reqob) => {

    try {
        const res = await axios.post(`${BASE_URL}`, reqob);
        const data = res.data;
        return data;
    } catch (e) {

        console.error(".......AN ERROR OCCURED IN REQUEST.........\n", e);
        return e;
    }

};

function post_faculty() {
    var name = $("#faculty_name").val();
    var workdes = $("#faculty_workdescription").val();
    var desg = $("#faculty_designation").val();
    var dep = $("#faculty_department").val();
    var img = $("#faculty_imageurl").val();
    var lin = $("#faculty_lin").val();
    var fb = $("#faculty_fb").val();
    var twi = $("#faculty_twi").val();
    var mail = $("#faculty_mail").val();

    var data = {
        "name": name,
        "image": img,
        "department": dep,
        "workdescription": workdes,
        "designation": desg,
        
        "facebook": fb,
        "twitter": twi,
        "email": mail,
        "linkedin": lin,        
    };
    
    if (name != "" && img != "" && dep != "" && desg != "" && workdes != "" && fb != "" && twi != "" && mail != "" && lin != "") {
        var s = sendrequest_faculty("http://localhost:3000/faculty", data);
    }
    else {
        console.log("in sufficient data");
    }

}

const sendrequest_faculty = async (BASE_URL, reqob) => {
    console.log("inside");

    try {
        const res = await axios.post(`${BASE_URL}`, reqob);
        const data = res.data;
        return data;
    } catch (e) {

        console.error(".......AN ERROR OCCURED IN REQUEST.........\n", e);
        return e;
    }

};
