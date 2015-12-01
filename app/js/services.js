angular.module('myCalculator')
    .service('computationService', function() {
        
        this.inputs = [];
        this.res = [];
        
        this.setInputs = function(input) {
            this.inputs = input;
        };

        this.getInputs = function(){
            return this.inputs;
        };

        this.add = function(Addend){
            for(var i=0; i<this.res.length; i++){
                var tmp = math.add(math.bignumber(this.res[i]),math.bignumber(Addend));
                this.res[i] = math.format(tmp);
            }
        };

        this.multiply = function(Multiplicand){
            for(var i=0; i<this.res.length; i++){
                var tmp = math.multiply(math.bignumber(this.res[i]), math.bignumber(Multiplicand));
                this.res[i] = math.format(tmp);
            }
        };

        this.sqrt = function(){
            for(var i=0; i<this.res.length; i++){
                if(this.res[i]<0){
                    return false;
                }
                var tmp = math.sqrt(this.res[i]);
                this.res[i] = math.format(tmp);
            }
            return true;
        };

        this.pow = function(Exponent){
            for(var i=0; i<this.res.length; i++){
                var tmp = math.pow(this.res[i], Exponent);
                this.res[i] = math.format(tmp);
            }
        };

        this.compute = function(maths){
            this.res = this.inputs.slice(0);
            for(var i=0; i<maths.length; i++){
                if(maths[i].op == '+'){
                    this.add(maths[i].operand);
                }else if(maths[i].op == '*'){
                    this.multiply(maths[i].operand);
                }else if(maths[i].op == 'sqrt'){
                    var sqrt = this.sqrt();
                    if(!sqrt){
                        return false;
                    }
                    // this.sqrt();
                }else if(maths[i].op == 'pow'){
                    this.pow(maths[i].operand);
                }
            }
            return true;
        };

        this.getResults = function(){
            // for(var i=0; i<this.res.length; i++){
            //     this.res[i] = parseFloat(this.res[i]);
            // }
            return this.res;
        };
        
    });
