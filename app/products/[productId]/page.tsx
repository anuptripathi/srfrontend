import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface SingleProductProps {
  params: { productId: string };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(params.productId);

  return (
    <Grid container marginBottom={"2rem"} rowGap={3}>
      <Grid md={6} xs={12}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">{product.price}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
