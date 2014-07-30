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

    function makeFunction(val) {
        return function (){
                return val;
        }
    }


    function isArray(val) {
       return Object.prototype.toString.call(val) === '[object Array]';
    }

    function push_to_buffer() {
        var args = [].slice.apply(arguments),
            length = args.length,
            i,
            val;


        for (i = 0; i < length; i += 1) {
            val = args[i];
            if(val === 'undefined' || val === 'null') {
                break;
            }
            (isFunction(val)) ? push_to_buffer.call(this, val()) : (isArray(val))
                              ? push_to_buffer.apply(this, val) : this.buffer.push(val);

        }


    }

    StringBuilder.prototype =  {
        old_sb: null,
        cat: function (){

            var wrap_it = this.$prefix.concat([].slice.call(arguments).concat(this.$suffix)); //wrap argument with pref and suffix


                push_to_buffer.apply(this, wrap_it); //will push wrapped arguments to buffer


            return this;
        },

        rep: function() {

            //set the arguments object to the 'this' value of .slice() can be done since arguments has a length property
            var args = [].slice.call(arguments, 0, -1),
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
            this.$suffix.splice(0,0,suf);
            return this;
        },

        prefix: function(pre) {
           this.wrap.call(this, pre, []);
           return this;
        },

        suffix: function(suf) {
           this.wrap.call(this, [], suf);
            return this;
        },

        end: function(deep) {
            var i;

            if (typeof  deep === 'number') {
                for (i = 0; i < deep; i += 1) {
                    this.$prefix.pop();
                    this.$suffix.pop();
                }
            } else {
                this.$prefix.pop();
                this.$suffix.pop();
            }

            return this.old_sb || this;


        },


        each: function(args, clbk) {
            var length = args.length,
                callback = (isFunction(clbk)) ? clbk : makeFunction(clbk),
                i;
            args = (isArray(args)) ? args : [];

            for(i = 0; i < length; i += 1) {
                callback.call(this, args[i], i, args );
            }

            return this

        },

        suspend: function() {
            var tmp_sb = new StringBuilder();
            tmp_sb.buffer = this.buffer;
            tmp_sb.old_sb = this;
            return tmp_sb;
        //temp pause/suspend effect done by wrap,suffix,prefix. the effects will continue after end() is declared
        },

        when: function(exp, thanArgs, otherWiseArgs) {

            var exp_result = (isFunction(exp)) ? exp.call(this) : exp;

            return (exp_result) ? this.cat(this, thanArgs) : this.cat(this, otherWiseArgs);

        }

    };



    col.StringBuilder = StringBuilder;
    return col;

}(this));