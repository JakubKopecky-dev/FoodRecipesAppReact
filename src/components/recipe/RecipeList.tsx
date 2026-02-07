import { useEffect, useState } from "react"
import type { RecipeWithCategory } from "../../types/recipe/RecipeWithCategory"
import { getAllRecipes } from "../../api/recipeApi"
import { Alert, Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";




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
        .finally(() => setLoading(false))
        
    }, [])


    if(loading){
        return(
            <Box sx={{display: 'flex',justifyContent: 'center',mt: 4}}>
                <CircularProgress/>
            </Box>
        )
    }

    if(error)
        return(
    <Alert security="error">
        {error}
    </Alert>
    )

    return (
        <List>
            {recipes.map(recipe =>(
                <ListItem>
                  <ListItemText                
                    primary={recipe.title}
                    secondary= {recipe.categories.join(', ')}
                  />  
                </ListItem>
            ))}
        </List>
    )
}






export default RecipeList