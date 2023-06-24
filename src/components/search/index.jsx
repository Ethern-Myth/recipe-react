import { useState, useMemo } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import RecipeReviewCard from "@components/card/index";

function SearchMemoized({ recipes, api_url }) {
    const [keyword, setKeyword] = useState("");

    const filteredRecipes = useMemo(() => {
        if (recipes) {
            return recipes.filter((recipe) => {
                return (
                    (keyword === "" ||
                        recipe.description.toLowerCase().includes(keyword.toLowerCase())) &&
                    (recipe.ingredients.length === 0 ||
                        recipe.ingredients.filter((ingredient) => (ingredient.toLowerCase().includes(keyword.toLowerCase())))
                    )
                );
            });
        }
    }, [keyword, recipes]);

    return (
        <>
            <Stack direction="horizontal" gap={4} className="mb-4">
                <Col>
                    <Row>
                        <Form.Group controlId="keyword">
                            <Form.Control
                                type="text"
                                value={keyword}
                                placeholder="Search recipe here ..."
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                </Col>
            </Stack>
            {recipes && filteredRecipes.map((recipe) =>
                <RecipeReviewCard
                    key={recipe._id}
                    recipe={recipe}
                    api_url={api_url}
                />
            )}
        </>
    )
}

export default SearchMemoized