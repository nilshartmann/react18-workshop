import ky from "ky";

export default undefined;

const title = "";
const body = "";
const tags = "";

type BlogPost = { title: string; body: string; id: string}

const x = ky.get<BlogPost[]>("http://localhost:7000/posts").json()

const newBlogPostPromise = ky.post<BlogPost>("http://localhost:7000/posts", {
	json: { title, body, tags }
}).json()


async function loadData() {
	try {
		const response = await fetch("http://localhost:7000/posts");
		if (!response.ok) {
			throw new Error("nicht ok");
		}
		const blogPosts = await response.json();
		console.log(blogPosts);

	} catch (err) {
		console.error("FEHLER", err)
	}
}

fetch("http://localhost:7000/posts")
	.then(response => {
		if (response.ok) return response.json();
		throw new Error("not found")
	})
	.then(data => console.log("BLOG POSTS", data))
	.catch(err => console.error("FEHLER", err));
//

//
// fetch("http://localhost:7000/posts", {
// 	method: "POST",
// 	body: JSON.stringify({
// 		title, body, tags
// 	}),
// 	headers: {
// 		"content-type": "application/json"
// 	}
// });

// ....
// ...
