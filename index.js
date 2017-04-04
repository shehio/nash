'use strict;';
const classes = require('./classes.js');
const Payoff = classes.Payoff;
const Pair = classes.Pair;
const Node = classes.Node;
const rows = 2;
const cols = 2;

// Strive for no side effects.

function find_pure(matrix) 
{
    var pure = [];
    for (var i = 0; i < rows; ++i) 
    {
        for (var j = 0; j < cols; ++j) 
        {
            if (check_neighbors(matrix, i, j)) 
            {
                pure.push(new Pair(i, j));
            }
        }
    }
    return pure;
}

/**
 *  As always, player one is represented by x in (x,y) coordinates, 
 *  and his/her choices is represented vertically.
 *  The exact opposite for player two.
 */
function check_neighbors(matrix, row, col) 
{
    var bool = true;
    var vertical = 1 - row;
    var horizontal = 1 - col;
    current = matrix[row][col];
    return (current.ltv(matrix[vertical][col]) &&
         current.lth(matrix[row][horizontal]));
}

function find_mixed(matrix) 
{
    var mixed = [];
    var r1c1 = matrix[0][0];
    var r1c2 = matrix[0][1];
    var r2c1 = matrix[1][0];
    var r2c2 = matrix[1][1];

    // p: probability that player one plays his/her first choice.
    var p = (r2c2.y - r2c1.y) / (r1c1.y + r2c2.y - r2c1.y - r1c2.y);
    var p1_average_payoff = r1c1.y * p + (1 - p) * r2c1.y; // or r1c2.y * p + (1 - p)  *r2c2.y

    // q: probability that player two plays his/her first choice.
    var q = (r2c2.x - r1c2.x) / (r1c1.x + r2c2.x - r2c1.x - r1c2.x);
    var p2_average_payoff = r1c1.x * q + (1 - q) * r1c2.x; // or r2c1.x * p + (1 - p)  *r2c2.x

    mixed.push({ p: p, average_payoff: p1_average_payoff });
    mixed.push({ p: q, average_payoff: p2_average_payoff });

    return mixed;
}


module.exports = {
    check_neighbors: check_neighbors,
    find_pure: find_pure,
    find_mixed: find_mixed
};