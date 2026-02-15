import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { DetailRecipe } from "../../types/recipe/DetailRecipe";
import { getRecipeDateilById } from "../../api/recipeApi";
import { Alert, Box, Chip, CircularProgress, Paper, Rating, Stack, Typography } from "@mui/material";


function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<DetailRecipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!id) return

        getRecipeDateilById(id)
            .then(data => {
                setRecipe(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [id]);


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

    if (!recipe)
        return (
            <Alert severity="warning">
                Recept nenalezen
            </Alert>
        );


    return (
        <Paper
            sx={{
                width: '100%',
                maxWidth: 1000,
                mx: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
            }}>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ p: 2, bgcolor: '#e3e6ff' }}
            >
                {/* Title */}
                <Typography fontSize={26}>
                    {recipe.recipe.title}
                </Typography>


                <Stack direction="row" alignItems="center">

                    {/* Time + Rating */}
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Typography>
                            ⏱ {recipe.recipe.cookingTimeInMinutes} min
                        </Typography>

                        <Rating value={recipe.recipe.rating} readOnly size="small" />

                    </Stack>

                    {/* Categories */}
                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ ml: 5 }}
                    >
                        {recipe.recipe.categories.map(category => (
                            <Chip key={category} label={category} />
                        ))}
                    </Stack>

                </Stack>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ pt: 1, px: 2, pb: 5 }}>

                <Box sx={{ flex: 1 }}>
                    <Typography sx={{
                        textAlign: "justify",
                        lineHeight: 1.8,
                        hyphens: "auto"
                    }} >
                        {recipe.recipe.instruction}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, py: 1 }}>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                            Ingredience
                        </Typography>

                        <Stack spacing={1}>
                            {recipe.ingredients.map(ingre => (
                                <Stack
                                    key={ingre.id}
                                    direction="row"
                                    sx={{
                                        py: 0.75,
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                        '&:last-of-type': { borderBottom: 0 },
                                    }}
                                >
                                    <Typography sx={{ flex: 1 }}>
                                        {ingre.title}
                                    </Typography>

                                    <Typography sx={{ width: 150 }}>
                                        {ingre.quantity} {ingre.unit}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>

                </Box>

            </Stack>

        </Paper>
    );

}





export default RecipeDetail