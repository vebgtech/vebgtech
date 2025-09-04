<?php
$servidor = "talentos";
$usuario = "vebgtech";
$senha = "Projeto12325";
$banco = "vebg";

//criar a coneção
$conn = new mysqli($servidor, $usuario, $senha, $banco);

//caso não conecte
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

?>
