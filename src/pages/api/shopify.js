export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { input } = req.body;

  const SHOPIFY_GRAPHQL_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN2}/admin/api/2024-07/graphql.json`;
  const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  // Define the GraphQL mutation for creating a product
  const query = `
    mutation CreateProductWithMetafields($input: ProductInput!, $media: [CreateMediaInput!]) {
      productCreate(
        input: {
          title: $input.title,
          metafields: [
            {
              namespace: "custom",
              key: "color",
              value: "Red",
              type: "single_line_text_field"
            },
            {
              namespace: "custom",
              key: "size",
              value: "Large",
              type: "single_line_text_field"
            }
          ]
        },
      ) {
        product {
          id
          title
          metafields(first: 3) {
            edges {
              node {
                namespace
                key
                value
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Construct the variables with input
  const variables = {
    input: {
      title: input.title, // Include title directly
      metafields: input.metafields, // Include metafields array
    },
  };

  try {
    // Make the POST request to Shopify Admin GraphQL API
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors || result.data.productCreate.userErrors.length > 0) {
      console.error(
        "Shopify Errors:",
        result.errors || result.data.productCreate.userErrors
      );
      return res
        .status(500)
        .json({
          errors: result.errors || result.data.productCreate.userErrors,
        });
    }

    // Send the successful response back to the client
    res.status(200).json(result.data.productCreate.product);
  } catch (err) {
    console.error("Shopify API request failed:", err);
    res.status(500).json({ error: "Failed to create product metafield" });
  }
}
