<?php
//conecta com o banco
include_once("../factory/conexao.php");

//define o conteúdo como json
header('Content-Type: application/json');

//coleta os dados via POST
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

//prepara para inserir os dados no sql
$stmt = $conn->prepare("INSERT INTO contato (nome, email, mensagem) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $mensagem);

//insere os dados
if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Mensagem enviada com sucesso!"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao enviar: " . $stmt->error]);
}

//fecha a conexão com o banco
$stmt->close();
$conn->close();
?>