interface FooterProps {
  name: string;
  year: number;
}

function Footer({ name, year }: FooterProps) {
  return (
    <footer className="footer">
      <p>&copy; {year} {name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;