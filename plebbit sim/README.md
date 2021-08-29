# Plebbit Simulator

In short this is a list of opinions. You can choose to increase/decrease the
score of each opinion, and they would be sorted in the order of descending opinion.
~~Unfortunately it can't hide the most popular shit opinion~~

## HTML

In short
1. Import all the CSS/ JS files/libraries
2. Adds the main `div` that the Vue app runs in
3. Adds the `comment` component, looping through for the amount of comments in the Vue app


## CSS

It styles the comment component such that it
1. Is in a grid layout, 2 columns, 1 for the buttons/score, 1 for the actual comment
2. Centering it, Rounding it's corners
3. Ensures that all components have the appropriate margin/padding/background colour to look nice

## VueJS

`comment` component
1. A `comment` component is initialised such that it has
    1. Upvote/Downvote buttons, as well as a score
    2. Comment div
2. Has methods to increase/decrease the score, which are called when the buttons are clicked by `@click`
    1. They basically call the methods from the app

The actual Vue app which
1. Has a list of comments with the text and score
2. Has methods which is called when the score of a comment is changed
    1. It changes the score value in the array (Have to do it outside of the component, such that the correct reference is changed)
    2. And then sorts the comments list.
3. Has a method which sorts the comments by score

help I written this semi tutorial and I still haven't finish port scanning. Only 20% done RIP me.
