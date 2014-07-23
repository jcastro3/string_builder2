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
        if(typeof val === 'function') {
            return true;
        }
        return false;
    }


    function isArray(val) {
        if(Object.prototype.toString.call(val) === '[object Array]'){
            return true;
        }
        return false;
    }


    StringBuilder.prototype =  {

        cat: function (){
            var length = arguments.length,
                i,
                val;
            for(i = 0; i < length; i += 1) {
                val = arguments[i];

                if(isFunction(val)) {
                    this.cat.call(this, val());
                } else if(isArray(val)) {
                    this.cat.apply(this, val);
                } else {
                    this.buffer.push(val);
                }
            }
           return this;
        }



    };



    col.StringBuilder = StringBuilder;
    return col;

}(this));