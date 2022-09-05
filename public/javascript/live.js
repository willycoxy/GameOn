const { response } = require("express");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14b035a1f0mshcc430d50a1c6dc4p1056b6jsn7b14355dde89',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

fetch('https://api-nba-v1.p.rapidapi.com/games?live=all', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    console.log(response)