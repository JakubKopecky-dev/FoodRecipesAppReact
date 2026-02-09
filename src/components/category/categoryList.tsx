import { useEffect, useState } from "react";
import type { Category } from "../../types/category/Category";
import { getAllCategories } from "../../api/categoryApi";
import { Alert, Box, CircularProgress, List, ListItem } from "@mui/material";

function CategoryList() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        )


    if (error)
        return (
            <Alert security="error">
                {error}
            </Alert>
        )


    return(
        <List>
            {categories.map(category =>(
                <ListItem>
                    {category.title}
                </ListItem>
            ))}
        </List>
    )


}


export default CategoryList