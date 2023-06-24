import NavbarDefault from "@components/navbar/index";

function Layout({ children }) {
	return (
		<>
			<NavbarDefault />
			<div className="mt-4">{children}</div>
		</>
	);
}

export default Layout;
