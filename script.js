var html = "";


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
