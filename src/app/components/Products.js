import React from 'react'

function Products({shopData,AddProduct,AddToCart}) {
  return (
    <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl mb-4 font-sans text-center">Products:</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {shopData?.products?.edges.map((product) => {
            const productImage = product.node.images.edges[0]?.node.url || "";
            const productPrice =
              product.node.variants.edges[0]?.node.priceV2?.amount || ""; 

            return (
              <div
                key={product.node.id}
                className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={product.node.title}
                      width={300}
                      height={300}
                      className="rounded object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>
                <h3 className="text-[2vh] font-medium text-gray-800 text-center">
                  {product.node.title}
                </h3>
                <p className="text-center text-gray-500">${productPrice}</p>{" "}
                <AddToCart
                  productId={product.node.id}
                  variantId={product.node.variants.edges[0].node.id}
                  productTitle={product.node.title}
                  productImage={productImage}
                  productPrice={productPrice}
                  className="flex justify-center items-center"
                />
              </div>
            );
          })}
        </div>

        <AddProduct />
      </div>
  )
}

export default Products
