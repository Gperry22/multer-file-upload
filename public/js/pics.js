console.log("App Starting");

$("#updatePic").empty();

function getPics() {
$.ajax({
    type: "GET",
    url: "/api/pics",
    dataType: "JSON",
}).then((result) => {
    console.log(result);
    postPics(result);
}).catch((err) => {
    console.log(err);
});
}

getPics()


function postPics(results) {
    console.log(results);

    results.forEach(pic => {
        console.log(pic.id);
        var picLink = pic.pictureLink.slice(7);

        var card = `
        <div class="card mLeft"  style="width: 18rem;" >
            <img class="card-img-top imgSize" src="${picLink}" alt="Card image cap">
            <div class="card-body" >
             <p class="card-text">${pic.picName}</p>
             <p class="card-text">${pic.picColor}</p>
             <button id="updateCard" data-id="${pic.id}" >Update</button>
        </div>
    </div>
    `
        $("#picsContainer").prepend(card)
    });
}


$("#picsContainer").on("click", "#updateCard", function (e) {
    e.preventDefault();
    var picId = ($(this).data("id"))
    addInputBoxes(picId)
});


function addInputBoxes(id) {
    $("#updatePic").empty();

    var inputBox =
        `
            <input type="text" name="imageName" placeholder="Image Name">
            <input type="text" name="imageColor" placeholder="Image Color">
            <button id="updateSubmit"  data-id="${id}">Submit</button>
    `
$("#updatePic").append(inputBox);
}


$("#updatePic").on("click", "#updateSubmit",function (e) {
    e.preventDefault()
    alert($(this).data("id"))
});


