import "./styles/NotFound.scss" // Asegúrate de crear este archivo CSS

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404 - Lost in Space!</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>

        <a href="/" className="home-button">
          Take me Home
        </a>
      </div>
    </div>
  )
}
