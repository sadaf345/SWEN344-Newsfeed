var html = "";

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
      console.log(2);
      var userNameHash = loginArr[0].value;
      window.open("index.html?myvar="+ encodeURI(userNameHash),"_self");
    }
  });
}

function saveUserCount() {
  var url = window.location.href;
  var getUserName = url.split('=');
  var userNameHash = getUserName[1] + "Count";
  console.log(userNameHash);
  var visitorCount = 0;
  if (typeof(Storage) !== "undefined") {
      if (localStorage.getItem(userNameHash) == null) {
        console.log("1st time");
        console.log(visitorCount);
        visitorCount++;
        localStorage.setItem(userNameHash, visitorCount);
      }
      else {
        console.log("Not 1st time");
        console.log(visitorCount);
        var accum = parseInt(localStorage.getItem(userNameHash), 10);
        accum++;
        localStorage.setItem(userNameHash, accum);
      }
  }
  return parseInt(localStorage.getItem(userNameHash), 10);

}

function loadNBA() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var url = "http://www.espn.com/espn/rss/" + "NBA" + "/news"
        init(url);
      }
    };
  xhttp.open("GET", "index.html", true);
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
    xhttp.open("GET", "index.html", true);
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
      xhttp.open("GET", "index.html", true);
      xhttp.send();
    }

  function addToFavorites(arr) {
    var line = "";
    var splitArray = arr.split(",");

    var titleLength = splitArray.length - 4;
    var title = "";
    for (var i = 0; i <= titleLength; i++) {
      title += splitArray[i];
    }
    var pubDate = splitArray[splitArray.length-3];
    pubDate += splitArray[splitArray.length-2];
    var link = splitArray[splitArray.length-1];

    $(".star.glyphicon").click(function() {
      $(this).toggleClass("glyphicon-star glyphicon-star-empty");
        line = '<div class="container"><div class="panel panel-primary"> <div class="panel-heading">  <h3>' + title + '<div style="float:right;"><span class="star glyphicon glyphicon-star" onclick="removeFromFavorites(\'' + arr + '\')"></span></div></h3></div>  <div class="panel-body"><i>' + pubDate + '</i> --  <a href="' + link +'" target="_blank">See original</a></p></div></div></div> ';
        html += line;
    });
  }

  function loadFavorites() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.querySelector("#content").innerHTML = html;
        }
      };
    xhttp.open("GET", "index.html", true);
    xhttp.send();
  }

  function removeFromFavorites(arr) {
    var line = "";
    var splitArray = arr.split(",");

    var titleLength = splitArray.length - 4;
    var title = "";
    for (var i = 0; i <= titleLength; i++) {
      title += splitArray[i];
    }
    var pubDate = splitArray[splitArray.length-3];
    pubDate += splitArray[splitArray.length-2];
    var link = splitArray[splitArray.length-1];

    line = '<div class="container"><div class="panel panel-primary"> <div class="panel-heading">  <h3>' + title + '<div style="float:right;"><span class="star glyphicon glyphicon-star" onclick="removeFromFavorites(\'' + arr + '\')"></span></div></h3></div>  <div class="panel-body"><i>' + pubDate + '</i> --  <a href="' + link +'" target="_blank">See original</a></p></div></div></div> ';

    console.log(html);

    html.replace(line, '');

    console.log(html);

    document.querySelector("#content").innerHTML = html;

  }
