/**
 * Created by jcastro on 7/21/2014.
 */
/*NOTES:
 * Use Array as internal Buffer at the end use the "JOIN" method to return resulting string
 * Must support cascade chaining pattern
 *
 *
 * */
(function(col) {

    var StringBuilder = function () { //constructor
           this.buffer = [];
    };

    function isFunction(val) {
        return typeof val === 'function';
    }


    function isArray(val) {
       return Object.prototype.toString.call(val) === '[object Array]'
    }


    StringBuilder.prototype =  {

        cat: function (){

            var args = [].slice.apply(arguments),
                length = args.length,
                i,
                val;
            for (i = 0; i < length; i += 1) {
                val = args[i];

                if (isFunction(val)) {
                    this.cat.call(this, val());
                } else if (isArray(val)) {
                    this.cat.apply(this, val);
                } else {
                    this.buffer.push(val);
                }
            }
           return this;
        },

        rep: function() {
            var length = arguments.length,
            //set the arguments object to the 'this' value of .slice() can be done since arguments has a length property
                args = [].slice.call(arguments, 0, -1),
                repeat = arguments[arguments.length -1],
                i;
            for (i = 0; i < repeat; i += 1) {

                this.cat.apply(this, args);
            }

            return this;
        },
        //argN..., flag
        catIf: function() {
            var last = arguments.length -1,
                args = [].slice.call(arguments, 0,last),
                constrain = arguments[last],
                i;
            for (i = 0; i < args.length; i += 1) {
                if(constrain) {
                    this.cat.apply(this, args);
                }
            }
            return this;
        }



    };



    col.StringBuilder = StringBuilder;
    return col;

}(this));