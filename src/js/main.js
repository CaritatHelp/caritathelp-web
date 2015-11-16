
$(document).ready(function(){
	//Bouton radio page de login
	$('#radioGender2').click(function(){
		$('#radioGender3').addClass("notActive").removeClass('active');
		$('#radioGender2').addClass("active").removeClass('notActive');
	})
	$('#radioGender3').click(function(){
		$('#radioGender2').addClass("notActive").removeClass('active');
		$('#radioGender3').addClass("active").removeClass('notActive');
	})
});