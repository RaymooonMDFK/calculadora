let state = {};
MEALS.forEach(m => { state[m.id] = [{ food: "", grams: "" }]; });