const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14b035a1f0mshcc430d50a1c6dc4p1056b6jsn7b14355dde89',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

fetch('https://api-nba-v1.p.rapidapi.com/games?id=52', options)
	.then(response => response.json())
    .then(data =>{
        console.log(data)

        document.getElementById('awaylogo').src = data.response[0].teams.visitors.logo
        document.getElementById('homelogo').src = data.response[0].teams.home.logo
        document.getElementById('arena').textContent = `Arena: ${data.response[0].arena.name}`
        document.getElementById('home').textContent = data.response[0].teams.home.code
        // document.getElementById('period').textContent = data.response[0].periods.current
        // document.getElementById('duration').textContent = data.response[0].status.long
        document.getElementById('away').textContent = data.response[0].teams.visitors.code
        // document.getElementById('awaypoints').textContent = data.response[0].scores.visitors.points
        // document.getElementById('homepoints').textContent = data.response[0].scores.home.points
        document.getElementById('officials').textContent = `Lead Ref: ${data.response[0].officials[1]}`
	 })
