import Layout from "../Layouts/Layout";



function Home({ title , description }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome {title} </h1>
            <h2 className="text-2xl">{description}</h2>
      
        </div>
    );
}

Home.layout = (page) => <Layout children={page} />;
export default Home;