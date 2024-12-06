function ProductCardBack() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 w-1/3">
            <div className="rounded-lg h-32 sm:h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/cardBack.jpg"
              />
            </div>
          </div>
          <div className="p-4 w-1/3">
            <div className="rounded-lg h-32 sm:h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/cardBack.jpg"
              />
            </div>
          </div>
          <div className="p-4 w-1/3">
            <div className="rounded-lg h-32 sm:h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/cardBack.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCardBack;
