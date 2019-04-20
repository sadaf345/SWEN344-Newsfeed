var html = "";
var htmlArr = [];
var htmlObj = {};



function register() {
  $(".btn-register").click(function() {
    var loginArr = $('form').serializeArray();

    if (loginArr[3].value != loginArr[4].value) {
      alert("Passwords do not match!");
    }
    else if (loginArr[3].value == localStorage.getItem(loginArr[2].value)) {
      alert("Account already exists!")
    }
    else {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem(loginArr[2].value, loginArr[3].value);
        showLoginForm();
      }
    }
  });
}

function login() {
  $(".btn-login").click(function() {
    var loginArr = $('form').serializeArray();
    if (loginArr[1].value != localStorage.getItem(loginArr[0].value) || localStorage.getItem(loginArr[0].value) == null) {
      alert("Incorrect username or password!")
    }
    else {
      var userNameHash = loginArr[0].value;
      window.open("index2.html?myvar="+ encodeURI(userNameHash),"_self");
    }
  });
}

function logout() {
  $("#logout").click(function() {
    window.open("index.html","_self");
  });
}

function savelastVisited() {
  var url = window.location.href;
  var getUserName = url.split('=');
  var userNameHash = getUserName[1] + "Count";

  if (typeof(Storage) !== "undefined") {
      if (localStorage.getItem(userNameHash) == null) {
        var firstVisit = "This is your first visit to this site!"
        var m = new Date();
        var dateString =
              m.getUTCFullYear() + "/" +
              ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
              ("0" + m.getDate()).slice(-2) + " " +
              ("0" + m.getHours()).slice(-2) + ":" +
              ("0" + m.getUTCMinutes()).slice(-2) + ":" +
              ("0" + m.getUTCSeconds()).slice(-2);
        localStorage.setItem(userNameHash, dateString);
        return firstVisit
      }
      else {
        var m = new Date();
        var dateString =
              m.getUTCFullYear() + "/" +
              ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
              ("0" + m.getDate()).slice(-2) + " " +
              ("0" + m.getHours()).slice(-2) + ":" +
              ("0" + m.getUTCMinutes()).slice(-2) + ":" +
              ("0" + m.getUTCSeconds()).slice(-2);

          localStorage.setItem(userNameHash, dateString);
      }
  }
  return localStorage.getItem(userNameHash);

}

function loadNBA() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var url = "http://www.espn.com/espn/rss/" + "NBA" + "/news"
        init(url);
      }
    };
  xhttp.open("GET", "index2.html", true);
  xhttp.send();

  }

  function loadNHL() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var url = "http://www.espn.com/espn/rss/" + "NHL" + "/news"
          init(url);
        }
      };
    xhttp.open("GET", "index2.html", true);
    xhttp.send();

    }

    function loadNFL() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var url = "http://www.espn.com/espn/rss/" + "NFL" + "/news"
            init(url);
          }
        };
      xhttp.open("GET", "index2.html", true);
      xhttp.send();
    }

  function addToFavorites(arr) {

    var line = "";
    var splitArray = arr.split(",");


    var titleLength = splitArray.length - 5;
    var title = "";
    for (var i = 0; i <= titleLength; i++) {
       title += splitArray[i];
    }
    var pubDate = splitArray[splitArray.length-4];
    pubDate += splitArray[splitArray.length-3];
    var link = splitArray[splitArray.length-2];
    var guid = splitArray[splitArray.length-1];

    $(".star.glyphicon").click(function() {
      $(this).toggleClass("glyphicon-star glyphicon-star-empty");
        line = '<div class="container"><div class="panel panel-primary"> <div class="panel-heading">  <h3>' + title + '<div style="float:right;"><span class="star glyphicon glyphicon-star" onclick="removeFromFavorites(\'' + arr + '\')"></span></div></h3></div>  <div class="panel-body"><i>' + pubDate + '</i> --  <a href="' + link +'" target="_blank">See original</a></p></div></div></div> ';
        htmlArr.push(line);
        htmlObj[guid] = line;
    });
  }

  function loadFavorites() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          for (htmlCode in htmlObj){
            html += htmlObj[htmlCode];
          }
          document.querySelector("#content").innerHTML = html;
        }
      };
    xhttp.open("GET", "index2.html", true);
    xhttp.send();
  }

  function removeFromFavorites(arr) {
    var line = "";
    var splitArray = arr.split(",");
    var guid = splitArray[splitArray.length-1];

    delete htmlObj[guid];

    html = "";
    for (htmlCode in htmlObj){
      html += htmlObj[htmlCode];
    }
    document.querySelector("#content").innerHTML = html;

  }
