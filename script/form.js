const submitBtn = document.querySelector('.submit-btn')

$(document).ready(function(){
 // trigger manual da modal 
 $('#myModal').modal({ show: false})

  // metodo para verificar a data de nascimento do usuario (ter nascido pelo menos no ano de 2004)
  $.validator.addMethod("birthDate", function(value,element, min) {
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();

    if (age > min + 1) {
      return true;
    }

    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= min;
  }, "data de nascimento inválida");



// validação dos campos do formulario
  $("#form").validate({
  rules:{
    name:{
      required: true,
      minlength: 3,
      maxlength: 15
    },

    cpf:{
      required: true,
      cpfBR: true
    },
    email:{
      required: true,
      email: true,
      
    },
    data:{ 
      required: true,
      date:true,
      birthDate: 20
    },

    password:{
      required: true,
      minlength: 6
    },

    confirmPassword:{
      required: true,
      equalTo: '#password'
    },

    RadioOptions:{
      required: true
    }

  },
  // executa a função quando o evento submit é disparado
  submitHandler: function (form,e) {
    e.preventDefault();
   // mensagem de loading que aparece no botão enquanto a requisição ajax ocorre
    submitBtn.textContent = "Loading...";
    
   // cria uma matriz de objetos (nome e valor) serializando os dados do formulário
    const formData  = $('form').serializeArray()
    console.log(formData)
    const email = formData[2].value
    const password = formData[4].value
    
// para fazer uma requisição de registro com sucesso a reqres.in API
// é necessario o email 'eve.holt@reqres.in' e uma senha
// qualquer outro email servirá para testar um registro sem sucesso

    $.ajax({
      url: "https://reqres.in/api/register",
      type: "POST",
      datatype: 'json',
      data: {
          "email": `${email}`,
          "password": `${password}`,
      },
      success: function(response){
         console.log(response);
         submitBtn.textContent = "SUBMIT";

         $('#myModal').modal('show');
         document.querySelector('#msg').textContent = "CADASTRADO ENVIADO COM SUCESSO"
         document.querySelector('#infors').textContent = `DADOS GERADOS - ID:${response.id} -  TOKEN:${response.token}`
          
      },
      error: function(response) {
         console.log(response)
         submitBtn.textContent = "SUBMIT";

         $('#myModal').modal('show');
         document.querySelector('#infors').textContent = "OCORREU UM ERRO, NÃO FOI POSSIVEL REALIZAR O CADASTRO :("
      }
    });  
  
   }
 })
})




