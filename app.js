import express from 'express';
import pets from './helper.js';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) =>
  res.send(
    `<h1>Adopt a Pet!</h1>
    <p> Browse through the links below to find your new furry friend:</p>
    <ul>
        <li>
            <a href='/animals/dogs'>Dogs</a>
        </li>
        <li>
            <a href='/animals/cats'>Cats</a>
        </li>
        <li>
            <a href='/animals/rabbits'>Rabbits</a>
        </li>
    </ul>
    `
  )
);

app.get('/animals/:pet_type', (req, res) => {
  const availablePets = pets[req.params.pet_type.toLowerCase()];

  if (!availablePets) return res.send(`<h2>Sorry we don't have ${req.params.pet_type}</h2>`);

  let listOfPets = `<ul>`;

  availablePets.forEach(pet => {
    listOfPets += `<li><a href='/animals/${req.params.pet_type}/${pet.name}'>${pet.name}</a></li>`;
  });

  /*   for (let i = 0; i < availablePets.length; i++) {
    listOfPets += `<li>${availablePets[i].name}</li>`;
  }
 */
  listOfPets += `</ul>`;

  res.send(
    `
    <h1>List of ${req.params.pet_type}</h1>
    ${listOfPets}
    `
  );
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const availablePets = pets[req.params.pet_type.toLowerCase()];

  if (!availablePets) return res.send(`<h2>Sorry we don't have ${req.params.pet_type}</h2>`);

  const selectedPet = availablePets.find(pet => pet.name === req.params.pet_id);

  if (!selectedPet)
    return res.send(
      `<h2>Sorry. Either ${req.params.pet_id.toLowerCase()} got adopted or this page does not exist</h2>`
    );

  res.send(
    `
    <h1>This is ${selectedPet.name} profile and it's ${selectedPet.age} years old</h1>
    <ul>
        <li>Breed: ${selectedPet.breed}</li>
        <li>Description: ${selectedPet.description}</li>
    </ul>
    <img src="${selectedPet.url}" alt="${selectedPet.name}" width='300px'/>
    `
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
