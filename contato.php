<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato - RafaDev Systems</title>
    <link rel="stylesheet" href="contato.css">
</head>
<body>
    <nav>
        <ul id="topMenu">
            <li>
                <a href="portifoliUm.html" aria-label="Página inicial da RafaDev Systems">
                    <img src="RafaDev_logo_1_free-file.jpg" alt="Logo da RafaDev Systems" id="logo" loading="lazy">
                </a>
            </li>
            <li><a href="portifoliUm.html">Home</a></li>
            <li><a href="sobreMim.html">Sobre Mim</a></li>
            <li><a href="projetos.html">Projetos</a></li>
            <li><a href="contato.php">Contato</a></li>
        </ul>
    </nav>

    <div class="section1 contact-container">
        <h1><div class="typing" id="typingEffect"></div></h1>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $nome = htmlspecialchars($_POST['usuario_nome']);
            $email = htmlspecialchars($_POST['usuario_email']);
            $telefone = htmlspecialchars($_POST['usuario_telefone']);
            $mensagem = htmlspecialchars($_POST['usuario_mensagem']);
            $data = date("d/m/Y H:i:s");

            // Salvar no arquivo mensagens.txt
            $texto = "[$data] Nome: $nome | Email: $email | Telefone: $telefone | Mensagem: $mensagem\n";
            file_put_contents("mensagens.txt", $texto, FILE_APPEND);

            echo "<p class='success'>Mensagem enviada com sucesso! Obrigado, $nome!</p>";
        } else {
            echo "<p class='error'>Erro: Nenhuma mensagem enviada.</p>";
        }
        ?>
        <a href="contato.php" class="button">Voltar</a>
    </div>

    <footer>
        <p>© 2025 Rafael - Todos os direitos reservados</p>
    </footer>

    <script>
        const textLines = [
            "Você tem algum projeto em mente?",
            "Se a resposta for sim!",
            "Entre em contato logo abaixo :)"
        ];

        const typingEffect = document.getElementById('typingEffect');
        let lineIndex = 0;
        let charIndex = 0;

        function typeLine() {
            if (lineIndex < textLines.length) {
                if (charIndex < textLines[lineIndex].length) {
                    typingEffect.textContent += textLines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, 30);
                } else {
                    typingEffect.textContent += '\n';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 500);
                }
            }
        }

        typeLine();
    </script>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
</html>