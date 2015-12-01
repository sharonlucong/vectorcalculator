Vector-Calculator
=====================

This project presents a solution to the Vector-Calculator. 

# Project Description
- This project includes 4 parts: a sidebar(for convenient display purpose), an input section, a math-operation section and a result section.
- For input and math-operation sections, there are two options for input types.
- Automatically add/delete elements by clicking "+"/"-" buttons beside each input.
- The result will only be shown when inputs and math operations are valid.
- Each section is collapsable.
- Click the title of each section in the sidebar can help user quickly locate to that particular section.
- Responsive design

# Installation

- Terminal: cd mathworks/app
- Run a simple HTTP server: python -m SimpleHTTPServer 8888

# Use

- Open the browser and connect to <http://127.0.0.1:8888/VectorCalculator.html>


# Technology stack

- Language: JavaScript
- Frontend framework: AngularJS, BootStrap
- Other Libraries: Math.js

# Test Case
- Input: 
	1,4,7,10,13
  Math:
		+ 2
		* 3
		sqrt()
		+ -4.5
  Result: 
	-1.5,-0.257359312880715,0.696152422706632,1.5,2.208203932499369

- Input:
	-2
  Math:
  		sqrt()
  Result:
  	error, sqrt() only accepts positive number

- Input:
	1.1, 1.1, 1.1
  Math:
  		+ 1.1
  		* 1.1
  Result:
     2.42, 2.42, 2.42

- Input:
	-3, -2, 3, 2, 0
  Math: 
  	    pow -3
  Result: 
    -0.037037037037037035, -0.125, 0.037037037037037035, 0.125, Infinity

- Input:
	-2, 3, -4
  Math:
  		pow -3
  		* 2
  		pow 3
  Result:
  -0.015625, 4.0644210740232686e-4, -3.0517578125e-5

- Input:
	-2, 3, -4
  Math:
  		pow -3
  		* 2
  		sqrt()
  Result:
	error, sqrt() only accepts positive number


# A few things that could be improved later
- advanced validation for negative inputs when doing sqrt() operation
- add different ways of inputs
- add more types of operations
- add charts for results (do some data visualizations for more friendly experience)

	# vectorcalculator
