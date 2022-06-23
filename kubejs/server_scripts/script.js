// priority: 0

settings.logAddedRecipes = true;
settings.logRemovedRecipes = true;
settings.logSkippedRecipes = false;
settings.logErroringRecipes = true;

onEvent("recipes", (event) => {
    event.shaped("1x chisel:chisel", ["  X", " X ", "Y  "], {
        X: "minecraft:diamond",
        Y: "minecraft:stick",
    });
});
