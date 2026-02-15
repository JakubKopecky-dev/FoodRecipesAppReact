import { useEffect, useState } from "react"
import type { RecipeWithCategory } from "../../types/recipe/RecipeWithCategory"
import { getAllRecipes } from "../../api/recipeApi"
import { Alert, Box, CircularProgress, List, ListItem, Typography, Stack, Chip, Rating, Paper } from "@mui/material";
import { formatDate } from "../../helpers/date";
import { useNavigate } from "react-router-dom";

function RecipeList() {
    const [recipes, setRecipes] = useState<RecipeWithCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllRecipes()
            .then(data => {
                setRecipes(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const navigate =  useNavigate();
    const handleOpenDetail = (id: string) => {
        navigate(`/recipes/${id}`)
    }

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );

    return (
        <List>
            {recipes.map(recipe => (
                <ListItem key={recipe.id}>
                    <Paper
                        elevation={2}
                        onClick={() => handleOpenDetail(recipe.id)}
                        sx={{
                            p: 3,
                            width: '100%',
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                            }
                        }} >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={0}
                            sx={{ width: '100%' }}

                        >
                            {/* TITLE */}
                            <Box sx={{flex: 1 }}>
                                <Typography sx={{ fontSize: { xs: 16, sm: 22 }, fontWeight: 500 }}>
                                    {recipe.title}
                                </Typography>
                            </Box>

                            {/* Categories – pevná šířka */}
                            <Box sx={{ width: { sm: 200 } }}>
                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                    {recipe.categories.map(category => (
                                        <Chip key={category} label={category} />
                                    ))}
                                </Stack>
                            </Box>

                            <Box sx={{ width: { sm: 100 } }}>
                                <Typography sx={{ fontSize: { xs: 11, sm: 16 } }}>
                                    {recipe.cookingTimeInMinutes} min.
                                </Typography>
                            </Box>

                            <Box sx={{ width: { sm: 140 } }}>
                                <Rating value={recipe.rating} readOnly />
                            </Box>

                            <Box sx={{ width: { sm: 140 } }}>
                                <Typography sx={{ fontSize: { xs: 11, sm: 16 }, fontStyle: 'italic' }}>
                                    {formatDate(recipe.createdAt)}
                                </Typography>
                            </Box>



                        </Stack>
                    </Paper>
                </ListItem>
            ))}
        </List>
    )
}

export default RecipeList