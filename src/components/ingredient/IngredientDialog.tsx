import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import type { IngredientUnit } from "../../types/ingredient/IngredientUnit";
import { createIngredient, updateIngredient } from "../../api/ingredientApi";
import type { CreateUpdateIngredient } from "../../types/ingredient/CreateUpdateIngredient";
import type { Ingredient } from "../../types/ingredient/Ingredient";

type Props = {
    open: boolean;
    onClose: () => void;
    recipeId: string;
    ingredient?: Ingredient;
    onCreated: (newIngredient: Ingredient) => void;
    onUpdated: (ingredient: Ingredient) => void;
    onError: (message: string) => void;
};

export const ingredientUnits: IngredientUnit[] = [
    "Gram",
    "Kilogram",
    "Liter",
    "Milliliter",
    "Piece"
];

function IngredientDialog({ open, onClose, recipeId, ingredient, onCreated, onUpdated, onError }: Props) {

    const [title, setTitle] = useState<string>("");
    const [unit, setUnit] = useState<IngredientUnit>("Gram");
    const [quantity, setQuantity] = useState<number>(0);


    useEffect(() => {
        if (ingredient) {
            setTitle(ingredient.title);
            setUnit(ingredient.unit);
            setQuantity(ingredient.quantity);
        } else {
            setTitle("");
            setUnit("Gram");
            setQuantity(0);
        }
    }, [ingredient, open]);


    const handleSubmit = async () => {
        try {
            const dto: CreateUpdateIngredient = {
                title,
                unit,
                quantity,
                recipeId
            }

            if (ingredient) {
                const updated = await updateIngredient(ingredient.id, dto);
                onUpdated(updated);
            } else {
                const created = await createIngredient(dto);
                onCreated(created);
            }

            onClose();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error";
            onError(message);
            onClose();
        };
    }



    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                textAlign="center">
                {ingredient ? "Editace ingredience" : "Přidat ingredienci"}
            </DialogTitle>

            <Stack spacing={4} sx={{ mx: 5, width: 400 }}>
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
                       {ingredient? "Uložit" : "Přidat"}
                    </Button>
                </DialogActions>






            </Stack>
        </Dialog>

    )

}







export default IngredientDialog;