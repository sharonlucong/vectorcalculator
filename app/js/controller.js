angular.module('myCalculator')
    .controller('inputCtrl', ['$scope', 'computationService', function($scope, computationService) {
        $scope.inputNums = [0];
        $scope.submitLen = function() {
            $scope.inputNums = [];
            for (var i = 0; i < parseInt($scope.inputLength); i++) {
                $scope.inputNums.push(0);
            }
            computationService.setInputs($scope.inputNums);
        };

        $scope.addItem = function(idx) {
        	if($scope.inputNums.length>=50){
        		return;
        	}
            $scope.inputNums.splice(idx + 1, 0, 0);
            computationService.setInputs($scope.inputNums);
        };

        $scope.removeItem = function(idx) {
            if (($scope.inputRadio == "input1" && $scope.inputNums.length > 1) || ($scope.inputRadio == "input2" && $scope.inputNums.length > 5)) {
                $scope.inputNums.splice(idx, 1);
                computationService.setInputs($scope.inputNums);
            }

        }

        $scope.$watch(function(scope) {
                return {
                    inputNums: scope.inputNums,
                    inputRadio: scope.inputRadio
                };
            },
            function(newValue, oldValue) {
                if (newValue.inputRadio != oldValue.inputRadio) {
                    if (newValue.inputRadio == 'input1') {
                        $scope.inputNums = [0];
                    } else {
                        $scope.inputNums = [];
                    }
                    $scope.$emit('update_parent_res', null);
                }
                if ($scope.inputNums) {
                    for (var i = 0; i < $scope.inputNums.length; i++) {
                        $scope.inputNums[i] = parseFloat($scope.inputNums[i]);
                    }
                }
                $scope.$emit('update_parent_input', $scope.inputNums);
                computationService.setInputs($scope.inputNums);
            },
            true
        );

        $scope.inputRadio = "input1";

    }])
    .controller('mathCtrl', ['$scope', 'computationService', function($scope, computationService) {
        $scope.mathOperations = [{
            op: '+',
            operand: 0
        }];
        $scope.submitLen = function() {
            $scope.mathOperations = [];
            for (var i = 0; i < parseInt($scope.operationLength); i++) {
                var temp = {
                    op: '+',
                    operand: 0
                };
                $scope.mathOperations.push(temp);
            }
        };
        $scope.addItem = function(idx) {
        	if($scope.mathOperations.length>=50){
        		return;
        	}
            $scope.mathOperations.splice(idx + 1, 0, {
                op: '+',
                operand: 0
            });
        };
        $scope.removeItem = function(idx) {
            if (($scope.mathRadio == "math1" && $scope.mathOperations.length > 1) || ($scope.mathRadio == "math2" && $scope.mathOperations.length > 4)) {
                $scope.mathOperations.splice(idx, 1);
            }
        };

        $scope.$watch(function(scope) {
                return {
                    mathOperations: scope.mathOperations,
                    mathRadio: scope.mathRadio,
                    inputNums: computationService.getInputs()
                };
            },
            function(newValue, oldValue) {
                $scope.inputNums = newValue.inputNums;
                if (newValue.mathRadio != oldValue.mathRadio) {
                    if (newValue.mathRadio == 'math1') {
                        $scope.mathOperations = [{
                            op: '+',
                            operand: 0
                        }];
                    } else {
                        $scope.mathOperations = [];
                    }
                    $scope.$emit('update_parent_res', null);
                }
                if ($scope.mathOperations) {
                    for (var i = 0; i < $scope.mathOperations.length; i++) {
                        if ($scope.mathOperations[i].op == 'sqrt') {
                            $scope.mathOperations[i].operand = "";
                        }
                        $scope.mathOperations[i].operand = parseFloat($scope.mathOperations[i].operand);
                    }
                }
                $scope.$emit('update_parent_mathOps', $scope.mathOperations);
            },
            true
        );

        $scope.compute = function() {
            if(computationService.compute($scope.mathOperations)){
                $scope.res = computationService.getResults().join(', ');
                
            }else{
                $scope.res = "error, sqrt() only accepts positive number";   
            }
            
            $scope.$emit('update_parent_res', $scope.res);
        };

        $scope.mathRadio = "math1";

    }])
    .controller('resCtrl', ['$scope', 'computationService','$location', '$anchorScroll', function($scope, computationService,$location, $anchorScroll) {
        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        }
        $scope.isNumber = function(x) {
            if (isNaN(x)) {
                return false;
            } else {
                return true;
            }
        };

        $scope.showMath = "2";

        $scope.$on("update_parent_input", function(event, message) {
            $scope.inputs = message.join(', ');
            $scope.validInputs = true;
            for(var i=0; i<message.length; i++){
                $scope.validInputs = $scope.validInputs & $scope.isNumber(message[i]);
            }
        });
        $scope.$on("update_parent_mathOps", function(event, message) {
            $scope.validMath = true;
            $scope.ops = message;
            for(var i=0; i<message.length; i++){
                if(message[i].op!=='sqrt'){
                    $scope.validMath = $scope.validMath & $scope.isNumber(message[i].operand);
                }
                
            }
            
        });
        $scope.$on("update_parent_res", function(event, message) {
            $scope.res = message;
        });
    }]);
