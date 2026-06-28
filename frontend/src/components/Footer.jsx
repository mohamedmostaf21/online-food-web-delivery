const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} Online Food Web App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
