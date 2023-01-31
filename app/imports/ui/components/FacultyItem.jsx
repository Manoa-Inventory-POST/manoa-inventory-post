import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const displayRestrictions = (recipe) => {
  const results = [];
  if (recipe.glutenFree) { results.push('Gluten Free'); }
  if (recipe.lactoseFree) { results.push('Lactose Free'); }
  if (recipe.vegan) { results.push('Vegan'); }
  if (recipe.vegetarian) { results.push('Vegetarian'); }

  return results;
};

const RecipeItem = ({ recipe }) => (
  <tr>
    <td><Image rounded width={100} src={recipe.image} /></td>
    <td>
      <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
    </td>
    <td>{recipe.servingSize}</td>
    <td>{recipe.estimatedTime} min</td>
    <td>{recipe.ingredientList}</td>
    <td><ul>{displayRestrictions(recipe).map((restriction) => <li>{restriction}</li>)}</ul></td>
  </tr>
);

// Require a document to be passed to this component.
RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    servingSize: PropTypes.number,
    estimatedTime: PropTypes.number,
    ingredientList: PropTypes.string,
    glutenFree: PropTypes.bool,
    lactoseFree: PropTypes.bool,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default RecipeItem;