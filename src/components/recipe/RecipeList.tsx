import { useEffect, useState } from "react"
import type { RecipeWithCategory } from "../../types/recipe/RecipeWithCategory"
import { getAllRecipes } from "../../api/recipeApi"
import { Alert, Box, CircularProgress, List, ListItem, Typography, Stack } from "@mui/material";
import { formatDate } from "../../helpers/date";

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
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        {/* TITLE – roste */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography sx={{ fontSize: { xs: 16, sm: 24 }, fontWeight: 500 }}>
                                {recipe.title}
                            </Typography>
                        </Box>

                        {/* Categories – pevná šířka */}
                        <Box sx={{ width: { sm: 200 } }}>
                            <Typography sx={{ fontSize: { xs: 11, sm: 16 } }}>
                                {recipe.categories.join(', ')}
                            </Typography>
                        </Box>

                        <Box sx={{ width: { sm: 100 } }}>
                            <Typography sx={{ fontSize: { xs: 11, sm: 16 } }}>
                                {recipe.cookingTimeInMinutes} min.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { sm: 80 } }}>
                            <Typography sx={{ fontSize: { xs: 11, sm: 16 } }}>
                                {recipe.rating}⭐
                            </Typography>
                        </Box>

                        <Box sx={{ width: { sm: 140 } }}>
                            <Typography sx={{ fontSize: { xs: 11, sm: 16 } }}>
                                {formatDate(recipe.createdAt)}
                            </Typography>
                        </Box>
                    </Stack>
                </ListItem>
            ))}
        </List>
    )
}

export default RecipeList