function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function controlCampos(){

    let nom = document.getElementById('nombre').value;
    let ape = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let pass1 = document.getElementById('password1').value;
    let pass2 = document.getElementById('password2').value;
    
    if(nom == ""||ape== ""||email==""||pass1==""||pass2 ==""){
        showAlertError();
        return;
    }
}