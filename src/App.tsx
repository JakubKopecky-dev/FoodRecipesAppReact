import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import RecipeList from "./components/recipe/RecipeList"
import { Container } from '@mui/material'
import RecipeDetail from "./components/recipe/RecipeDetail"
import RecipeForm from "./components/recipe/RecipeForm"
import MainMenu from "./components/mainMenu/MainMenu"

function App() {
  return (
    <>
      <BrowserRouter>
        <MainMenu/>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes" />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/create" element={< RecipeForm />} />
            <Route path="/recipes/:id/edit" element={<RecipeForm />} />
          </Routes>
        </Container>

      </BrowserRouter>

    </>
  )
}

export default App
