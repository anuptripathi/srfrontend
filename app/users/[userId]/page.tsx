import { Stack, Typography } from "@mui/material";
import getUser from "./get-user";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface SingleUserProps {
  params: { userId: string };
}

export default async function SingleUser({ params }: SingleUserProps) {
  const user = await getUser(params.userId);

  return (
    <Grid container marginBottom={"2rem"} rowGap={3}>
      <Grid md={6} xs={12}>
        <Stack gap={3}>
          <Typography variant="h2">{user.name}</Typography>
          <Typography>{user.email}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
