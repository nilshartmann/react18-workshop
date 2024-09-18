import {createBrowserRouter, Link, NavLink, Outlet} from "react-router-dom";
import PostListPage from "./PostListPage";
import PostEditor from "./PostEditor";

export const router = createBrowserRouter([
	{
		path:     "/",
		element:  <Layout/>,
		children: [
			{index: true, element: <PostListPage/>},
			{path: "editor", element: <PostEditor/>},
			// { path: "/posts/:postId", element: <... />},
		]
	},

	{path: "*", element: <h1>Not found :-(</h1>}
]);

export function Layout() {
	return (
		<div className={"Layout"}>
			<header>
				<div>
					<h2>React Example Blog App</h2>
				</div>
				<div>
					<Link className="Link" to={"/"}>Post List</Link>
					<NavLink to={"/"}
									 className={f => {
										 return f.isActive ? "Tag" : "Black"
									 }}

					>Post List</NavLink>
					<NavLink to={"/editor"}
									 className={f => {
										 return f.isActive ? "Tag" : ""
									 }}
					>Editor</NavLink>
				</div>
			</header>
			<Outlet/>
		</div>
	);
}
