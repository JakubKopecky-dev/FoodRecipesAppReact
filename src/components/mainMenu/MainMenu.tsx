import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



function MainMenu() {
    const navigate = useNavigate();


    return (
        <AppBar position="static" elevation={0}>
            <Toolbar
                sx={{
                    height: 80,
                    bgcolor: "#d8d8d8",
                    color: "black",
                    position: "relative"
                }}
            >
                {/* Title absolutně na střed */}
                <Typography
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 30,
                        fontWeight: 600
                    }}
                >
                    Recepty
                </Typography>

                {/* Spacer vlevo */}
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" spacing={5}>
                    {/* Button vpravo */}
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
 
                            fontSize: 16
                        }}
                        onClick={() => navigate("/recipes")}
                    >
                        Přehled receptů
                    </Button>

                    {/* Button vpravo */}
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
            
                            fontSize: 16
                        }}
                        onClick={() => navigate("/recipes/create")}
                    >
                        Nový recept
                    </Button>
                </Stack>

            </Toolbar>
        </AppBar>
    )


}


export default MainMenu
