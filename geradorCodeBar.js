document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('barcodeForm');
    const barcodeInput = document.getElementById('barcodeInput');
    const barcodeCanvas = document.getElementById('barcodeCanvas');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputValue = barcodeInput.value.trim();
        if (inputValue) {
            try {
                JsBarcode(barcodeCanvas, inputValue, {
                    format: "CODE128", // Formato do código de barras
                    lineColor: "#000", // Cor das barras
                    width: 2, // Largura das barras
                    height: 100, // Altura do código
                    displayValue: true, // Mostrar o número abaixo
                    text: inputValue,
                    font: "monospace",
                    textAlign: "center",
                    background: "#fff", // Fundo branco
                    margin: 10
                });
            } catch (error) {
                console.error("Erro ao gerar código de barras:", error);
                alert("Erro ao gerar o código. Verifique os números inseridos.");
            }
        } else {
            alert("Por favor, insira um número válido.");
        }
    });
});