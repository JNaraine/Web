

function getGithubInfo(user) {
   //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
   var xhttp =new XMLHttpRequest();
   xhttp.open('GET', "https://api.github.com/users/"+user, false);
   xhttp.send();
   return xhttp;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var image = new Image();
    image.src = user.avatar_url;

    var anchor = $('<a>');
    anchor.attr('href', user.html_url);
    anchor.text('Link to Page');

    $('#profile').children('h2').text(user.name + ' - ' +user.login);
    $(".avatar").append(image);
    $('.information').append(anchor)
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('#profile').children('h2').text(username+'does not exist');
    var image = new Image();
    image.src = 'https://www.pinclipart.com/picdir/big/562-5624234_png-red-x-red-x-clipart.png';
    $(".avatar").append(image);
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            $(".avatar").empty();
            $('.information').empty();
            $('#profile').children('h2').empty();
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
