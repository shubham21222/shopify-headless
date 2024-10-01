export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { input } = req.body;

  const SHOPIFY_GRAPHQL_URL = `https://demostore-new.myshopify.com/admin/api/2023-07/graphql.json`;
  const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "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";

  const query = `
    mutation CreateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          createdAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { input },
      }),
    });

    const data = await response.json();

    if (data.errors || data.data.productCreate.userErrors.length > 0) {
      return res.status(500).json({
        message: "Failed to create product",
        errors: data.errors || data.data.productCreate.userErrors,
      });
    }

    res.status(200).json(data.data.productCreate.product);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}
