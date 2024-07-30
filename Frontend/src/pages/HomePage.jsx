import "../styles/HomePage.css";

const HomePage = () => {
    return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1>Welcome to Our Restaurant</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
        </p>
        <a className="btn btn-primary" href="/menu">View Menu</a>
      </div>
    </div>
    );
}

export default HomePage;