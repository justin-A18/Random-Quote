const $quotes = document.querySelector('#quotes');

const getData = async () => {
	const res = await fetch('https://api.quotable.io/random');
	const data = await res.json();
	const { author, content, tags } = data;

	const getTag = tags
		.map(
			(tag) =>
				`<li class="border-2 border-solid border-[#6466E9] px-2 py-1 rounded-xl text-[#6466E9]">${tag}</li>`
		)
		.join('');

	const template = `
		<div class="flex flex-col items-center gap-3">
			<h2 id="author" class="text-white text-center font-bold text-xl">${author}</h2>
			<ul class="flex items-center gap-5">${getTag}</ul>
		</div>
		<p id="text" class="text-2xl text-[#717C8F] text-center">${content}</p>
	`;

	$quotes.innerHTML = template;
};

const copyQuote = (author,text) => {
	navigator.clipboard.writeText(`${author} ${text}`);
}

document.addEventListener('DOMContentLoaded', () => {
	getData();
});

document.addEventListener("click",(e) => {
	if(e.target.matches("#random *")){
		getData();
	}

	if(e.target.matches("#copy *")){
		const $author = $quotes.querySelector("#author").textContent;
		const $text = $quotes.querySelector("#text").textContent;
		copyQuote($author,$text);

		alert("Texto copiado con exito");
	}
})