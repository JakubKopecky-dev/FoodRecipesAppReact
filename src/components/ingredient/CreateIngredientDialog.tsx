import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import type { IngredientUnit } from "../../types/ingredient/IngredientUnit";
import { createIngredient } from "../../api/ingredientApi";
import type { CreateUpdateIngredient } from "../../types/ingredient/CreateUpdateIngredient";

type Props = {
    open: boolean;
    onClose: () => void;
    recipeId: string;
};

export const ingredientUnits: IngredientUnit[] = [
    "Gram",
    "Kilogram",
    "Liter",
    "Milliliter",
    "Piece"
];

function IngredientDialog({ open, onClose, recipeId }: Props) {

    const [title, setTitle] = useState<string>("");
    const [unit, setUnit] = useState<IngredientUnit>("Gram");
    const [quantity, setQuantity] = useState<number>(0);

    const handleSubmit = async () => {
        try {
            const createDto: CreateUpdateIngredient = {
                title,
                unit,
                quantity,
                recipeId
            }

            await createIngredient(createDto)
        }
        catch (err) {
            err instanceof Error ? err.message : "Unexpected error"
        };
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
            textAlign="center">
                Přidat ingredienci
            </DialogTitle>

            <Stack spacing={4} sx={{mx:5, width:400}}>
                <TextField
                    label="Název"
                    value={title}
                    onChange={e => setTitle(e.target.value)}    
                />

                <TextField
                    label="Množství"
                    value={quantity}
                    type="number"
                    onChange={e => setQuantity(Number(e.target.value))}
                />

                <TextField
                    select
                    label="Jednotka"
                    value={unit}
                    onChange={e => setUnit(e.target.value as IngredientUnit)}
                >
                    {ingredientUnits.map((u) => (
                        <MenuItem key={u} value={u}>
                            {u}
                        </MenuItem>
                    ))}
                </TextField>

                <DialogActions>
                    <Button onClick={onClose}>Zrušit</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Přidat
                    </Button>
                </DialogActions>






            </Stack>
        </Dialog>

    )

}







export default IngredientDialog;