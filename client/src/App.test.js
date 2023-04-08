import { render, screen } from '@testing-library/react';
import App from './App';

var supertest = require("supertest-as-promised")(require("../app"));
var expect = require("chai").expect;
var model = require("../models/model");

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("GET responde con el Pokemon indicado pasado por query", function () {
  return supertest
    .get("/pokemons?name=pikachu")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(function (res) {
      expect(res.body).to.eql([
        {
          "id": 25,
          "name": "pikachu",
          "types": [
            "electric"
          ],
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          "height": 4,
          "weight": 60,
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "speed": 90
        }
      ]); 
    });
});
