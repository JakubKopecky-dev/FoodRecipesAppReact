import { BrowserRouter, Route, Routes } from "react-router-dom"
import RecipeList from "./components/recipe/RecipeList"
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import RecipeDetail from "./components/recipe/RecipeDetail"

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar position="static"  >
          <Toolbar sx={{ justifyContent: 'center', height: 80 }}>
            <Typography variant="h6" component="div" fontSize={35} >
              Recepty
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
          <Route path="/" element={<RecipeList/>} />
          <Route path="/recipes/:id" element={<RecipeDetail/>}/>
          </Routes>
        </Container>

      </BrowserRouter>

    </>
  )
}

export default App
