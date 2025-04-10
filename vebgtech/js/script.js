//infos back e front-end
function abrirPopup(role) {
  var popup = document.getElementById("popup");
  var popupText = document.getElementById("popup-text");

  if (role === "back") {
    popupText.innerText = "O desenvolvedor Back-end gerencia servidores, bancos de dados e a lógica do funcionamento do site.";
  } else if (role === "front") {
    popupText.innerText = "O desenvolvedor Front-end cria a interface e a experiência do usuário no site.";
  }

  popup.classList.add("ativo");
}

//fecha as infos
function fecharPopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("ativo");
}

//abre as infos
document.querySelectorAll(".popup-trigger").forEach(item => {
  item.addEventListener("click", function () {
    abrirPopup(this.getAttribute("data-role"));
  });
});

//forms contato
$(document).ready(function () {
  function validarCampo(campo) {
    const valor = campo.val().trim();
    const id = campo.attr("id");
    let valido = true;

    if (id === "nome") {
      valido = valor.length >= 2;
    } else if (id === "email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      valido = emailPattern.test(valor);
    } else if (id === "mensagem") {
      valido = valor.length >= 5;
    } else if (id === "confirm") {
      valido = campo.is(":checked");
    }

    if (valido) {
      campo.removeClass("is-invalid").addClass("is-valid");
    } else {
      campo.removeClass("is-valid").addClass("is-invalid");
    }

    return valido;
  }

  $("#nome, #email, #mensagem").on("input", function () {
    validarCampo($(this));
  });

  $("#confirm").on("change", function () {
    validarCampo($(this));
  });

  $("#formContato").on("submit", function (e) {
    e.preventDefault();

    const campos = [$("#nome"), $("#email"), $("#mensagem"), $("#confirm")];
    let todosValidos = true;

    campos.forEach(function (campo) {
      if (!validarCampo(campo)) {
        todosValidos = false;
      }
    });

    if (!todosValidos) return;

    $.ajax({
      url: "controller/processa-contato.php",
      type: "POST",
      data: $("#formContato").serialize(),
      dataType: "json",
      success: function (resposta) {
        const msgSucesso = $("#mensagemSucesso");
        const msgErro = $("#mensagemErro");

        if (resposta.status === "sucesso") {
          $("#formContato")[0].reset();
          $(".is-valid").removeClass("is-valid");

          msgErro.hide();
          msgSucesso.text(resposta.mensagem).fadeIn();

          setTimeout(() => {
            msgSucesso.fadeOut();
          }, 4000);
        } else {
          msgSucesso.hide();
          msgErro.text(resposta.mensagem).fadeIn();

          setTimeout(() => {
            msgErro.fadeOut();
          }, 5000);
        }
      },
      error: function () {
        $("#mensagemErro").text("Erro ao enviar, tente novamente.").fadeIn();
        setTimeout(() => {
          $("#mensagemErro").fadeOut();
        }, 5000);
      }
    });
  });
});

//botão que leva ao topo
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});