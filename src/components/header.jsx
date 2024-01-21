import "../header.css";
function Header() {
  return (
    <>
      <header className="header">
        <p>
          <a href="/">PixelPond</a>
        </p>
        <div>
          <button>Login</button>
          <button>Create Account</button>
        </div>
      </header>
    </>
  );
}

export default Header;
