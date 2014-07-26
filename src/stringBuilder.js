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

    var StringBuilder;
    StringBuilder = function () { //constructor
        this.buffer = [];
        this.$prefix = [];
        this.$suffix = [];

    };

    function isFunction(val) {
        return typeof val === 'function';
    }


    function isArray(val) {
       return Object.prototype.toString.call(val) === '[object Array]'
    }

    function push_to_buffer() {
        var args = [].slice.apply(arguments),
            length = args.length,
            i,
            val;


        for (i = 0; i < length; i += 1) {
            val = args[i];

            if (isFunction(val)) {
                push_to_buffer.call(this, val());
            } else if (isArray(val)) {
                push_to_buffer.apply(this, val);

            } else {

                this.buffer.push(val);
            }
        }


    }

    StringBuilder.prototype =  {

        cat: function (){

            var wrap_it = this.$prefix.concat([].slice.call(arguments).concat(this.$suffix)); //wraps all prefix arguments suffix if any specified

            push_to_buffer.apply(this, wrap_it); //this function will push to buffer

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
        },

       string: function() {
           var result = this.buffer.join('');
           return result;
       },

       wrap: function(pre, suf){
            this.$prefix.push(pre);
            this.$suffix.push(suf);
            return this;
        },

        prefix: function(pre) {
           this.wrap.call(this, pre, []);
        },

        suffix: function(suf) {
           this.wrap.call(this, [], suf);
        },

       end: function(deep) {
            this.$prefix.pop(deep);
            this.$suffix.pop(deep);
            return this;
        }








    };



    col.StringBuilder = StringBuilder;
    return col;

}(this));