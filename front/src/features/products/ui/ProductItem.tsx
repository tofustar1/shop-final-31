import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Stack, styled} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotAvailable from '../../../assets/images/not-available.jpg';
import {API_URL} from "../../../constants.ts";

interface Props {
  title: string;
  price: number;
  id: string;
  image: string | null;
  categoryTitle: string;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});

const ProductItem = ({ title, price, id, image, categoryTitle }: Props) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = `${API_URL}/images/${image}`;
  }

  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
      <Card>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} sx={{mb: 2}}/>
        <Stack spacing={1}>
          <CardContent component="strong" sx={{py: 0}}>
            Category: {categoryTitle}
          </CardContent>
          <CardContent component="strong" sx={{py: 0}}>
            Price: {price} KGS
          </CardContent>
        </Stack>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>

  );
};

export default ProductItem;