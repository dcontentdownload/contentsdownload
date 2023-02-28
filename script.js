const contents = [
	{
		name: "上の",
		url: "https://ja.wikipedia.org/wiki/%E3%81%82",
		thumbnail: "p1.jpeg",
		date: "2023-02-25"
	},
	{
		name: "飯田",
		url: "https://ja.wikipedia.org/wiki/%E3%81%82",
		thumbnail: "p2.jpeg",
		date: "2023-02-26"
	},
	{
		name: "コンテンツ3",
		url: "https://ja.wikipedia.org/wiki/%E3%81%82",
		thumbnail: "p3.jpeg",
		date: "2023-02-27"
	},
	// 他のコンテンツを追加
];

const itemsPerPage = 20;

const sortBy = document.getElementById("sort-by");
const contentList = document.getElementById("content-list");
const pagination = document.getElementById("pagination");

let currentPage = 1;

function generateContentList(page) {
	contentList.innerHTML = "";

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const pageContents = contents.slice(startIndex, endIndex);

	for (const content of pageContents) {
		const item = document.createElement("div");
		item.classList.add("content-item");

		const thumbnail = document.createElement("img");
		thumbnail.src = content.thumbnail;
		item.appendChild(thumbnail);

		const name = document.createElement("h2");
		const link = document.createElement("a");
		link.href = content.url;
		link.textContent = content.name;
		name.appendChild(link);
		item.appendChild(name);

		contentList.appendChild(item);
	}
}

function generatePagination() {
	pagination.innerHTML = "";

	const numPages = Math.ceil(contents.length / itemsPerPage);

	for (let i = 1; i <= numPages; i++) {
		const link = document.createElement("button");
		link.classList.add("page-link");
		link.textContent = i;

		if (i === currentPage) {
			link.classList.add("active");
		}

		link.addEventListener("click", () => {
			currentPage = i;
			generateContentList(currentPage);
			generatePagination();
		});

		pagination.appendChild(link);
	}
}

sortBy.addEventListener("change", () => {
	const value = sortBy.value;

	if (value === "name") {
		contents.sort((a, b) => a.name.localeCompare(b.name));
	} else if (value === "date") {
		contents.sort((a, b) => new Date(b.date) - new Date(a.date));
	}

	currentPage = 1;
	generateContentList(currentPage);
	generatePagination();
});

generateContentList(currentPage);
generatePagination();