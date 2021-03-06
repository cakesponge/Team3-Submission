function myFunction() {
    var x = document.getElementById("myTopnav"); //var x is bound to the TopNav
    if (x.className === "topnav") { 
      x.className += " responsive"; 
    } else {
      x.className = "topnav";
    }
  }