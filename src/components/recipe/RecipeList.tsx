import { useEffect, useState } from "react"
import type { RecipeWithCategory } from "../../types/recipe/RecipeWithCategory"
import { getAllRecipes } from "../../api/recipeApi"
import { Alert, Box, CircularProgress, List, ListItem, Typography, Stack, Chip, Rating, Paper, TextField, Select, MenuItem, Slider } from "@mui/material";
import { formatDate } from "../../helpers/date";
import { useNavigate } from "react-router-dom";
import type { Category } from "../../types/category/Category";
import { getAllCategories } from "../../api/categoryApi";

function RecipeList() {
    const [recipes, setRecipes] = useState<RecipeWithCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const [search, setSearch] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [minRating, setMinRating] = useState<number>(0)
    const [cookingTimeMax, setCookingTimeMax] = useState<number>(300);

    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await getAllRecipes();
                setRecipes(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected error");
            }
            finally {
                setLoading(false)
            }
        }

        const loadCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Unexpected error");
            }
        }


        loadRecipes();
        loadCategories()
    }, [])



    const handleOpenDetail = (id: string) => {
        navigate(`/recipes/${id}`)
    }



    const filteredRecipes = recipes.filter(recipe => {

        const matchesSearch = recipe.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());

        const matchesCategory = selectedCategory === null ||
            recipe.categories.includes(selectedCategory);

        const matchesCookingTime = recipe.cookingTimeInMinutes === null || recipe.cookingTimeInMinutes <= cookingTimeMax;

        const matchesRating = recipe.rating === null || recipe.rating >= minRating;


        return matchesSearch && matchesCategory && matchesCookingTime && matchesRating
    });



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
        <Box>

            {/* FILTERS */}
            <Stack
                direction="row"
                spacing={3}
            >
                <TextField
                    label="Search by title"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{ width: 300 }}
                />

                <Select
                    value={selectedCategory ?? ""}
                    onChange={e => setSelectedCategory(e.target.value || null)}
                    sx={{ width: 150 }}
                    displayEmpty
                >
                    <MenuItem value="">Vše</MenuItem>
                    {categories.map(cat => (
                        <MenuItem key={cat.id} value={cat.title}>{cat.title}</MenuItem>
                    ))}
                </Select>

                <Rating
                    value={minRating}
                    onChange={(_, val) => setMinRating(val ?? 0)}
                />

                <Box sx={{ width: 200 }}>
                    <Typography variant="caption">Max. doba vaření: {cookingTimeMax} min</Typography>
                    <Slider
                        value={cookingTimeMax}
                        min={0}
                        max={300}
                        onChange={(_, val) => setCookingTimeMax(val as number)}
                        valueLabelDisplay="auto" 
                    />
                </Box>

            </Stack>

            <List>
                {filteredRecipes.map(recipe => (
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
                                <Box sx={{ flex: 1 }}>
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
        </Box>
    )
}

export default RecipeList