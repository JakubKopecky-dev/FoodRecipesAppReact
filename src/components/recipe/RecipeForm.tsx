import { Alert, Autocomplete, Box, Button, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, patchRecipeCategories, updateRecipe } from "../../api/recipeApi";
import type { CreateRecipe } from "../../types/recipe/CreateRecipe";
import type { UpdateRecipe } from "../../types/recipe/UpdateRecipe";
import type { PatchRecipeCategories } from "../../types/recipe/PatchRecipeCategories";
import type { Category } from "../../types/category/Category";
import { getAllCategories } from "../../api/categoryApi";

function RecipeForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [title, setTitle] = useState<string>("");
    const [categoryNames, setCategoryNames] = useState<string[]>([]);
    const [rating, setRating] = useState<number | null>(null);
    const [instruction, setInstruction] = useState<string | null>(null);
    const [cookingTimeInMinutes, setCookingTimeInMinutes] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [allCategories, setAllCategories] = useState<Category[]>([])


    const navigate = useNavigate();
    const isTitleValid = title.trim().length >= 2;


    const handleSubmit = async () => {

        if (!isTitleValid) {
            setError("Název musí mít alespoň 2 znaky");
            return
        }

        try {


            if (isEdit && id) {
                const updateDto: UpdateRecipe = {
                    title: title,
                    rating: rating,
                    instruction: instruction,
                    cookingTimeInMinutes: cookingTimeInMinutes
                };
                await updateRecipe(id, updateDto);

                const patchDto: PatchRecipeCategories = {
                    categories: categoryNames
                }

                await patchRecipeCategories(id, patchDto)

            } else {
                const createDto: CreateRecipe = {
                    title: title,
                    categoryNames: categoryNames,
                    rating: rating,
                    instruction: instruction,
                    cookingTimeInMinutes: cookingTimeInMinutes
                }
                await createRecipe(createDto);
            }

            navigate("/recipes")

        }
        catch (err: any) {
            setError(err.message)
        }
    }


    useEffect(() => {
        getAllCategories()
            .then(data => {
                setAllCategories(data)
            })
            .catch(err => {
                console.error(err)
            })
    })



    return (
        <Paper sx={{ maxWidth: 800, mx: 'auto', p: 3 }} elevation={5}>
            <Typography>
                {isEdit ? "Úprava receptu" : "Nový recept"}
            </Typography>

            <Stack spacing={3}>
                <TextField
                    required
                    label="Název"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                    error={!isTitleValid && title.length > 0}
                    helperText={
                        !isTitleValid && title.length > 0
                            ? "Název musí mít alespoň 2 znaky"
                            : ""}
                />
                <Stack direction="row" spacing={3}>
                    <TextField
                        label="Doba přípřavy (min)"
                        type="number"
                        value={cookingTimeInMinutes}
                        onChange={e => setCookingTimeInMinutes(e.target.value === "" ? null : Number(e.target.value))}
                    />

                    <Box>
                        <Typography>Hodnocení</Typography>

                        <Rating
                            value={rating}
                            onChange={(_, newRating) => {
                                setRating(newRating)
                            }}
                            max={5}

                        />
                    </Box>
                </Stack>

                <TextField
                    label="Instrukce"
                    multiline
                    rows={6}
                    value={instruction}
                    onChange={e => setInstruction(e.target.value)}

                />

                <Autocomplete
                    multiple
                    options={allCategories}
                    getOptionLabel={option => option.title}
                    value={allCategories.filter(cat => categoryNames.includes(cat.title))}
                    onChange={(_, newValue) => setCategoryNames(newValue.map(x => x.title))}
                    renderInput={params => (
                        <TextField{...params} label="Kategorie" />
                    )}

                />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/recipes")}
                    >
                        Zrušit
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!isTitleValid}
                    >
                        {isEdit ? "Uložit změny" : "Vytvořit recept"}
                    </Button>
                </Stack>

                {error && <Alert severity="error">
                    {error}
                </Alert>}



            </Stack>
        </Paper>
    )
}


export default RecipeForm