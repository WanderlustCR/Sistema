const db = firebase.auth();
const Username = document.getElementById('Username');
const Passwors = document.getElementById('Password');
const Loggin = document.getElementById('login_fields__submit');
const auth = document.getElementById('Auth');
const Cot = document.getElementById('Coti');


function Coti(){
	auth.style.display = "none";
	Cot.innerHTML = `<iframe src="men.html" width="100%" height="800px"></iframe>`;
}
function Ver(){
	auth.style.display = "none";
	Cot.innerHTML = `<iframe src="example1/index.html" width="100%" height="800px"></iframe>`;
}



function Forget(){
	alert("Contacte al departamento de IT o a la supervisora a cargo para reiniciar la contraseña");
}
function Log(){
	firebase.auth().signInWithEmailAndPassword(Username.value, Passwors.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
       var user = userCredential.user;
    	setTimeout(function(){
    $(".authent").show().animate({right:-320},{easing : 'easeOutQuint' ,duration: 600, queue: false });
    $(".authent").animate({opacity: 1},{duration: 200, queue: false }).addClass('visible');
  },500);
     $('.login').addClass('test')
  setTimeout(function(){
    $('.login').addClass('testtwo')
  },300);
  
  setTimeout(function(){
    $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
    $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
    $('.login').removeClass('testtwo')
  },2500);
  setTimeout(function(){
    $('.login').removeClass('test')
    $('.login div').fadeOut(123);
  },2800);
  setTimeout(function(){
    $('.success').fadeIn();
  },3200);

  
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage);
  })


}
	


window.addEventListener('DOMContentLoaded', async (e) =>{ 
	
	
})