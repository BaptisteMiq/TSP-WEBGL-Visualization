# Travelling Salesman Problem with Nearest Neighbour algorithm

Solving this famous problem with simple nearest neighbour (NN) algorithm in WEBGL with p5.js.
[What is the Travelling Salesman Problem ?](https://en.wikipedia.org/wiki/Travelling_salesman_problem)


## How does the NN algorithm works ?

This program will generate n random spheres (called "flies") in the code, and will execute the nearest neighbour algorithm.
The algorithm takes a "start point" (the red sphere) that will look for the nearest sphere, creating a link to it. Every sphere that is already linked cannot be linked again. There are numbers on links that represent in which order they were created.
When the algorithm made the path passing through all spheres, it will create a link between the last and the first one, like shown bellow:

![example](https://i.imgur.com/31NPLiF.png)


## Demonstration

https://youtu.be/4UPtLGJNDfg


## How to use the program

Just launch the index.html file (you may need to host the file due to CORS errors).
You can zoom with mouse wheel.


## Resources that I used

https://en.wikipedia.org/wiki/Travelling_salesman_problem (en)
https://en.wikipedia.org/wiki/Greedy_algorithm (en)
https://interstices.info/le-probleme-du-voyageur-de-commerce/ (fr)
