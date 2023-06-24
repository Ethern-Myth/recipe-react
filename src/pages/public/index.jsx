import SearchMemoized from "@components/search/index";

function Home({ recipes, isLoading, api_url }) {
	if (isLoading) return "Loading...";

	return (
		!isLoading ?
			(<SearchMemoized recipes={recipes} api_url={api_url} />) : ("No items to show. Sorry!")
	);
}

export default Home;
