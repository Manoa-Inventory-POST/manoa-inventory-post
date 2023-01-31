import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Dropdown, DropdownButton, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import RecipeItem from '../components/RecipeItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const FacultySearch = () => {

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [servingSize, setServingSize] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [dietRestrications, setDietRestrictions] = useState('');

  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(FacultyProfiles.userPublicationName);
    const rdy = subscription.ready();
    const recipeItems = FacultyProfiles.collection.find({}).fetch();
    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  // set recipes in filteredRecipies when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredRecipes(recipes);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = recipes;
    if (recipeName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(recipeName.toLowerCase()); });
    }
    if (servingSize) {
      filtered = filtered.filter(function (obj) { return obj.servingSize.toString() === servingSize.toString(); });
    }
    if (estimatedTime) {
      filtered = filtered.filter(function (obj) { return obj.estimatedTime.toString() === estimatedTime.toString(); });
    }
    if (ingredients) {
      filtered = filtered.filter(function (obj) { return obj.ingredientList.toLowerCase().includes(ingredients.toLowerCase()); });
    }
    switch (dietRestrications) {
      case 'Gluten Free':
        filtered = filtered.filter(function (obj) { return obj.glutenFree === true; });
        break;
      case 'Lactose Free':
        filtered = filtered.filter(function (obj) { return obj.lactoseFree === true; });
        break;
      case 'Vegan':
        filtered = filtered.filter(function (obj) { return obj.vegan === true; });
        break;
      case 'Vegetarian':
        filtered = filtered.filter(function (obj) { return obj.vegetarian === true; });
        break;
      default:
        filtered = filtered.filter(function (obj) { return obj; });
    }
    setFilteredRecipes(filtered);
  }, [recipeName, servingSize, estimatedTime, ingredients, dietRestrications]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Search Recipes</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by recipe name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Recipe Name
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter a recipe"
                      onChange={e => setRecipeName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by serving size">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Serving Size
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a serving size"
                      onChange={e => setServingSize(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by time">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Estimated Time
                    </Col>
                    <input
                      type="number"
                      className="shadow-sm"
                      placeholder="Enter a time"
                      onChange={e => setEstimatedTime(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by ingredients">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Ingredients
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      placeholder="Enter an ingredient"
                      onChange={e => setIngredients(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="Filter dietary restrictions">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Dietary Restrictions
                    </Col>
                    <DropdownButton
                      id="savedFilterDropdown"
                      variant="secondary"
                      title={dietRestrications === '' ? 'Select Restrictions' : dietRestrications}
                      onSelect={(e) => setDietRestrictions(e)}
                    >
                      <Dropdown.Item eventKey="">Any</Dropdown.Item>
                      <Dropdown.Item eventKey="Gluten Free">Gluten Free</Dropdown.Item>
                      <Dropdown.Item eventKey="Lactose Free">Lactose Free</Dropdown.Item>
                      <Dropdown.Item eventKey="Vegan">Vegan</Dropdown.Item>
                      <Dropdown.Item eventKey="Vegetarian">Vegetarian</Dropdown.Item>
                    </DropdownButton>
                  </label>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
        <tr>
          <th>Image</th>
          <th>Recipe Name</th>
          <th>Serving Size</th>
          <th>Estimated Time</th>
          <th>Ingredients</th>
          <th>Dietary Restrictions</th>
        </tr>
        </thead>
        <tbody>
        { filteredRecipes.length === 0 ? (<tr><td>-</td></tr>) : filteredRecipes
          .map((recipe) => <RecipeItem key={recipe._id} recipe={recipe} />)}
        </tbody>
      </Table>
      { filteredRecipes.length === 0 ? <div className="d-flex justify-content-center">No recipes found.</div> : '' }
    </div>
  );

  return (
    <Container id="search-recipe-page">
      <div className="d-flex justify-content-center">
        <Row id="dashboard-screen">
          <Col className="mx-3">
            <Row id="dashboard-filter">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list">{returnList()}</Row> : '' }
            { ready ? '' : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FacultySearch;