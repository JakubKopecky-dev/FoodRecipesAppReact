import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { DetailRecipe } from "../../types/recipe/DetailRecipe";
import { deleteRecipe, getRecipeDateilById } from "../../api/recipeApi";
import { Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, Edit } from "@mui/icons-material";
import IngredientDialog from "../ingredient/CreateIngredientDialog";


function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<DetailRecipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [ingredienteDialog, setIngredienteDialog] = useState<boolean>(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const loadRecipe = async () => {
            try {
                const data = await getRecipeDateilById(id);
                setRecipe(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected error");
            }
            finally {
                setLoading(false);
            }
        };

        loadRecipe();

    }, [id]);


    const deleteRecipeHandler = async (id: string) => {
        try {
            await deleteRecipe(id);
            setDeleteDialog(false);
            navigate("/recipes");
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        }


    }


    const editRecipeHandler = (id: string) => {
        navigate(`/recipes/${id}/edit`)
    }




    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                Ingredience
                            </Typography>

                            <IconButton onClick={() => setIngredienteDialog(true)}>
                                <Add
                                    sx={{
                                        fontSize: 15,
                                        color: "rgb(151, 151, 151)",

                                    }}
                                />
                            </IconButton>

                        </Stack>

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

            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1, mr: 1 }} spacing={4}>


                <IconButton onClick={() => editRecipeHandler(recipe.recipe.id)}>
                    <Edit
                        sx={{
                            fontSize: 40,
                            color: "rgb(151, 151, 151)",

                        }}
                    />
                </IconButton>

                <IconButton onClick={() => setDeleteDialog(true)}>
                    <DeleteIcon
                        sx={{
                            fontSize: 40,
                            color: "rgb(151, 151, 151)",
                        }}

                    />
                </IconButton>

            </Stack>

            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>
                    Opravdu chceš smazat recept {recipe.recipe.title}?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>
                        Zrušit
                    </Button>

                    <Button color="error" onClick={() => deleteRecipeHandler(recipe.recipe.id)}>
                        Smazat
                    </Button>
                </DialogActions>

            </Dialog>

            <IngredientDialog
                open={ingredienteDialog}
                recipeId={recipe.recipe.id}
                onClose={() => setIngredienteDialog(false)}
            />

        </Paper>
    );

}





export default RecipeDetail