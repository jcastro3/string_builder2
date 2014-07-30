/**
 * Created by jcastro on 7/29/2014.
 */

describe('SUSPEND method', function() {
    var sb,storage;

    beforeEach(function () {
        sb = new StringBuilder();

    });
    describe('simple strings as suffix and prefix', function () {
        it('should suspend the string then use end', function () {
            var expected = 'helloworld<b>!</b><b>!</b><b>!</b><b>!</b><b>!</b>';
                storage = sb
                    .wrap('<b>', '</b>')
                    .suspend()
                    .cat('hello')
                    .cat('world')
                    .end()
                    .rep('!', 5)
                    .string();

            expect(storage).toBe(expected);
            expect(typeof storage).toBe('string');
        });

        it('should wrap with given array parameters', function () {
            var expected = 'this should be plain text, and this is plain text repeated 2 times and this is plain text repeated 2 times<p><b>BUT THIS IS BOLD!!!</b></p>';
            storage = sb
                .wrap(['<p>', '<b>'],['</b>', '</p>'] )
                .suspend()
                .cat('this should be plain text,')
                .end()
                .suspend()
                .rep(' and this is plain text repeated 2 times', 2)
                .end()
                .cat('BUT THIS IS BOLD!!!')
                .string();
            expect(storage).toBe(expected);
        })
    });
    describe('using arrays', function () {

        it('should wrap given arrays', function () {
            var sections = ['section 1', 'section 2', 'section 3'],
                expected_string = '<body>' + '\n'+
                    '  <section><h1>section 1</h1><p>first paragraph</p><p>second ' +
                    'paragraph</p></section>' + '\n'+
                    '  <section><h1>section 2</h1><p>first paragraph</p><p>second ' +
                    'paragraph</p></section>'+ '\n'+
                    '  <section><h1>section 3</h1><p>first paragraph</p><p>second '+
                    'paragraph</p></section>'+ '\n'+
                    '</body>';

            storage =  sb
                .suffix('\n')
                .cat('<body>')
                .prefix('  ')
                .wrap('<section>', '</section>')
                .each(sections, function(section, index){
                    sb
                        .cat('<h1>', section, '</h1>', function(){
                            sb
                                .suspend()
                                .wrap('<p>', '</p>')
                                .cat('first paragraph')
                                .cat('second paragraph')
                                .end(2)
                        })
                })
                .end(3)
                .cat('</body>')
                .string();
            expect(typeof storage).toBe('string');

            expect(storage).toBe(expected_string);
        });

    });

});