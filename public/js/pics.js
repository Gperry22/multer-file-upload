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
        var picLink = pic.pictureLink.slice(7)
        var div = $("<div>")
        var img = $("<img>");

        img.attr("src", picLink);
        img.addClass("imgSize picClick");
        img.data("data-id", pic.id);
        var p1 = $("<p>");
        p1.text(pic.picName);
        var p2 = $("<p>");
        p2.text(pic.picColor)
        div.append(img,p1,p2)
        $("#picsContainer").prepend(div)
    });
}

$("#picsContainer").on("click", ".picClick", function (e) {
    e.preventDefault();
    var picId = ($(this).data("data-id"))
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


