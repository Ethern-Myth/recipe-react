import NavbarDashboard from "@components/navbar/dashboard"

function Layout({ children }) {
    return (
        <>
            <NavbarDashboard />
            <div className="mt-4">{children}</div>
        </>
    )
}

export default Layout