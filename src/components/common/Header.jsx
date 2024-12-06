import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <FaShoppingBasket />
          <span className="ml-3 text-xl">골라잡아보쇼</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/random" className="mr-5 hover:text-gray-900">
            내 취향대로 상품
          </Link>
          <Link href="/product" className="mr-5 hover:text-gray-900">
            상품 둘러보기
          </Link>
          <Link href="/cart" className="mr-5 hover:text-gray-900">
            장바구니
          </Link>
        </nav>
      </div>
      <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
    </header>
  );
}

export default Header;
