document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const temperature = document.getElementById('temperature');
    const windspeed = document.getElementById('windspeed');
    const condition = document.getElementById('condition');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const response = await fetch(url);
            const data = await response.json();

            const weather = data.current_weather;
            temperature.textContent = weather.temperature;
            windspeed.textContent = weather.windspeed;
            condition.textContent = getWeatherCondition(weather.weathercode);
        } catch (error) {
            console.error('Erro ao consultar o clima:', error);
            temperature.textContent = 'Erro';
            windspeed.textContent = 'Erro';
            condition.textContent = 'Erro ao carregar';
        }
    });

    // Traduzir o código  clima da Open-Meteo para texto
    function getWeatherCondition(code) {
        const conditions = {
            0: 'Céu limpo',
            1: 'Parcialmente nublado',
            2: 'Nublado',
            3: 'Muito nublado',
            45: 'Nevoeiro',
            61: 'Chuva leve',
            63: 'Chuva moderada',
            65: 'Chuva forte',
            95: 'Tempestade'
        };
        return conditions[code] || 'Desconhecido';
    }
});