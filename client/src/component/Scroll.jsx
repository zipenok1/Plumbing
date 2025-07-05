import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Scroll() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        // Убираем хеш из URL после скролла
        setTimeout(() => {
          navigate(pathname, { replace: true });
        }, 500);
      }
    }
  }, [hash, pathname, navigate]);

  // Функция для обработки кликов по ссылкам
  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault(); // Предотвращаем стандартный переход
      const sectionId = href.substring(1); // Убираем #
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        // Обновляем URL, чтобы useEffect сработал снова
        navigate(`/#${sectionId}`, { replace: true });

        // Через 500 мс убираем хеш
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      }
    }
  };
  useEffect(() => {
    // Вешаем обработчик кликов на все <Link> внутри <nav>
    const links = document.querySelectorAll("nav a");
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      // Очищаем обработчики при размонтировании
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);

  return null;
}
export default Scroll



