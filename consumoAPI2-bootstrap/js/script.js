const divErro = document.getElementById("div-erro");
divErro.style.display = "none";

// Função para carregar os dados
const carregarDados = async () => {
  try {
    const response = await fetch(
      "https://www.mercadobitcoin.net/api/BTC/trades/"
    );
    const dados = await response.json();
    prepararDados(dados);
  } catch (error) {
    divErro.style.display = "block";
    divErro.innerHTML = `<b>Erro ao acessar API:</b> ${error}`;
  }
};

const prepararDados = (dados) => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
      drawPriceChart(dados);
      drawVolumeChart(dados);
    });
  
    // Função para desenhar o gráfico de preços
    function drawPriceChart(dados) {
      let dados_linha = [["Índice", "Preço"]];
  
      dados.forEach((item) => {
        dados_linha.push([new Date(item.date * 1000), item.price]);
      });
  
      var data = google.visualization.arrayToDataTable(dados_linha);
  
      var options = {
        title: "Variação de Preços",
        curveType: "function",
        legend: { position: "bottom" },
      };
  
      var chart = new google.visualization.LineChart(
        document.getElementById("grafico-precos")
      );
      chart.draw(data, options);
    }
  
    // Função para desenhar o gráfico de volume
    function drawVolumeChart(dados) {
      let dados_volume = [["Índice", "Volume"]];
  
      dados.forEach((item) => {
        dados_volume.push([new Date(item.date * 1000), item.amount]);
      });
  
      var data = google.visualization.arrayToDataTable(dados_volume);
  
      var options = {
        title: "Volume de Negociações",
        curveType: "function",
        legend: { position: "bottom" },
      };
  
      var chart = new google.visualization.LineChart(
        document.getElementById("grafico-volume")
      );
      chart.draw(data, options);
    }
  };