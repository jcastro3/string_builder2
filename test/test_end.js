/**
 * Created by jcastro on 7/29/2014.
 */

describe('END method', function() {
    var sb,
        storage,
        expected,
        empty = [];

    beforeEach(function () {
        sb = new StringBuilder();
        expected = [];
    });

    describe('check with empty values ', function() {
        it('no given parameters only functions', function() {
            storage = sb.end();
            expect(typeof storage).toBe('object');
            expect(storage.$prefix).toEqual(empty);
            expect(storage.$suffix).toEqual(empty);
            storage = sb.end(5);
            expect(storage.$prefix).toEqual(empty);
            expect(storage.$suffix).toEqual(empty);
            storage = sb.suffix().end().prefix().end();
            expect(typeof storage).toBe('object');
            expect(storage.$prefix).toEqual(empty);
            expect(storage.$suffix).toEqual(empty);

        });
    describe('end prefix included', function() {
        it('should pass, the specific given prefix', function() {
            expected = ['show this'];

            storage = sb.prefix('dont show this').end().prefix('show this');
            expect(storage.$prefix).toMatch(expected);
            expect(storage.$suffix).toMatch(empty);

            sb.$prefix = [];
            expected = ['show this', 'and this', 'and that too!'];
            storage = sb
                .prefix('dont show this')
                .prefix('and this neither')
                .end(2)
                .prefix('show this')
                .prefix('and this')
                .prefix('not this')
                .end(1)
                .prefix('and that too!')
            expect(storage.$prefix).toMatch(expected);
            expect(storage.$prefix.length).toBe(3);

            sb.$prefix = [];
            expected = ['show this only!'];
            storage = sb
                .prefix('dont show this')
                .prefix('and this neither')
                .prefix('dont show this')
                .prefix('and this')
                .prefix('not this')
                .prefix('me either')
                .prefix('and that too!')
                .end(7)
                .prefix('show this only!')
            expect(storage.$prefix).toMatch(expected);
            expect(storage.$prefix.length).toBe(1);
            })
        });

        describe('end and suffix included', function() {
            it('should pass, the specific given suffix', function() {
                expected = ['show this'];

                storage = sb.suffix('dont show this').end().suffix('show this');
                expect(storage.$suffix).toMatch(expected);
                expect(storage.$prefix).toMatch(empty);

                sb.$suffix = [];
                expected = ['show this', 'and this', 'and that too!'];
                storage = sb
                    .suffix('dont show this')
                    .suffix('and this neither')
                    .suffix('not this')
                    .end(3)
                    .suffix('and this')
                    .suffix('not this')
                    .end(2)
                    .suffix('and not that too!')
                    .suffix('and not this')
                    .end(2);
                expect(storage.$suffix).toMatch(empty);
                expect(storage.$suffix.length).toBe(0);

                sb.$suffix = [];
                expected = ['show this only!'];
                storage = sb
                    .suffix('dont show this')
                    .suffix('and this neither')
                    .suffix('dont show this')
                    .suffix('and this')
                    .suffix('not this')
                    .suffix('me either')
                    .suffix('and that too!')
                    .end(7)
                    .suffix('show this only!')
                expect(storage.$suffix).toMatch(expected);
                expect(storage.$suffix.length).toBe(1);
            })
        })

        describe('END method full integration', function() {
            it('should pass, using wrap', function() {
                var expected_string =  '<ul>'+'\n'+
                                            '<li>1.- list item</li>'+'\n'+
                                            '<li>2.- list item</li>'+'\n'+
                                            '<li>3.- list item</li>'+'\n'+
                                            '<li>4.- list item</li>'+'\n'+
                                            '<li>5.- list item</li>'+'\n'+
                                        '</ul>'
                var result = sb.suffix('\n')
                                .cat('<ul>')
                                .wrap(['<li>', function(){ var count = 0; return function() { return count+= 1;}}(), '.-'], '</li>')
                                .rep(' list item',5)
                                .end(2)
                                .cat('</ul>')
                                .string();
                expect(result).toBe(expected_string);
            });

            it('multiple ends , combined with wrap prefix and suffix', function(){
                var expected_string = '<table>' + '<thead>Contact List</thead>';
                for(var i = 1; i < 101; i += 1) {
                    expected_string += '<tr>' +

                                            '<td>'+i +'. Name</td>'+

                                       '</tr>'
                }
                expected_string += '</table>';

                var result = sb.cat('<table>')
                                .wrap(function(){ return '<thead>'}, ['</thead>'])
                    .cat('Contact List')
                    .end()
                    .wrap(['<tr>','<td>', function() { var count =0; return function(){ return count += 1}}(), '. '], ['</td>','</tr>'])
                    .rep('Name', 100)
                    .end()
                    .cat('</table>')
                    .string();
                expect(result).toBe(expected_string);
            })
        });
    });


});