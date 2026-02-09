import CategoryList from "./components/category/categoryList"
import RecipeList from "./components/recipe/RecipeList"
import { AppBar, Toolbar, Typography, Container } from '@mui/material'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Recepty
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{mt: 4}}>
        <RecipeList/>
      </Container>

      <Container maxWidth="md" sx={{mt:4}}>
        <CategoryList/>
      </Container>

    </>
  )
}

export default App
