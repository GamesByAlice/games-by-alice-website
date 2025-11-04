interface HeaderProps {
  title: string;
  tagline: string;
}

function Header({ title, tagline }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        <p className="tagline">{tagline}</p>
      </div>
    </header>
  );
}

export default Header;