<nav>
	<img class="inverseLogo" src="Images/InverseLogo.png"/>
	<span class="title"><a href="artists_final.php">playsmoothpiano</a></span>
</nav>
<div class="logo">
	<div class="leftpanel">		
		<span class="artistsName">Drake "From Time"</span>		
		<img src="/Images/blkx/artists/artist_64.png"></img>
	</div>
	<a href="index.php"><img src="/Images/sevenkeys.png"></img></a>	
	<div class="rightpanel">
		<iframe src="https://player.vimeo.com/video/75136872?autoplay=1&loop=0" width="290" height="160" frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen autoplay="1">			
		</iframe>
	</div>
</div>

<nav class="menu">
	<form id="searchForm" class="searchForm" novalidate="true" method="get" action="./artists_final.php">
		<input id="search-field" class="search" onclick="clearField();" type="text" value="find songs"  name='pg' maxlength="30"></input>
	</form>
  <a href="Contact_Us.php">about</a>
  <a href="AtoL.php">retro video tutorials</a>
  <a href="artists.php?pg=sheet-music">sheet music</a>
  <a id="authBtn" href="#" style="border-right-style: none !important;"><img src=<?php echo isset($_SESSION["username"]) ? "/Images/LogoutLogo.png" : "/Images/Login-Icon.png" ?> ></img><?php echo isset($_SESSION["username"]) ? "logout" : "login"?></a>
</nav>
<script type="text/javascript">
	function clearField() {
		document.getElementById("search-field").value = "";
	}
</script>
