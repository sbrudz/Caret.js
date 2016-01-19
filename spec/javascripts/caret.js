describe('jquery.caret', function() {
  var $inputor;
  $inputor = null;
  var fixPos = 0;

  describe('InputCaret', function() {
    beforeEach(function() {
      var html = ''
        + '<textarea id="inputor" name="at" rows="8" cols="40">'
        + '  Stay Foolish, Stay Hungry. @Jobs'
        + '</textarea>';

      var fixture = setFixtures(html);
      $inputor = fixture.find('#inputor');

      var fixPos = 20;
    });

    it('Set/Get caret pos', function() {
      $inputor.caret('pos', 15);
      expect($inputor.caret('pos')).toBe(15);
    });

    // TODO: I don't know how to test this functions yet. = =.
    // it("Set/Get caret position", function() {
    //   $inputor.caret('position', 20);
    //   pos = $inputor.caret('position'); // => {left: 15, top: 30, height: 20}
    //   expect(pos).toBe({ left : 2, top : 2, height : 17 });
    // });

    // $('#inputor').caret('offset'); // => {left: 300, top: 400, height: 20}
    // $('#inputor').caret('offset', fixPos);
  });

  describe('EditableCaret', function() {
    describe('basic cases', function() {
      beforeEach(function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + 'Hello <span>World</span>!'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');
      });

      it('sets the caret position at start of the text', function() {
        $inputor.caret('pos', 0);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Hello ');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(0);
      });

      it('sets the caret position within the first word', function() {
        $inputor.caret('pos', 3);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Hello ');
        expect(selection.anchorOffset).toBe(3);
        expect($inputor.caret('pos')).toBe(3);
      });

      it('sets the caret position in a span', function() {
        $inputor.caret('pos', 8);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(2);
        expect($inputor.caret('pos')).toBe(8);
      });

      it('sets the caret position at the end of a line', function() {
        $inputor.caret('pos', 12);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('!');
        expect(selection.anchorOffset).toBe(1);
        expect($inputor.caret('pos')).toBe(12);
      });
    });

    describe('DIV cases', function() {
      beforeEach(function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + 'Hello<div>World</div><div><br></div>'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');
      });

      it('sets the caret at the start of a new line of text', function() {
        $inputor.caret('pos', 6);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(6);
      });

      it('sets the caret at the end of a new line of text', function() {
        $inputor.caret('pos', 11);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(5);
        expect($inputor.caret('pos')).toBe(11);
      });

      it('can set the caret position on a blank line', function() {
        $inputor.caret('pos', 12);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeName).toBe('DIV');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(12);
      });
    });

    describe('LI cases', function() {
      beforeEach(function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + 'Hello<div><ul><li>World</li><li></li><ul><li>Test</li></ul></ul></div>'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');
      });

      it('can set the caret position at the start of a list item', function() {
        $inputor.caret('pos', 6);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(6);
      });

      it('sets the caret position at the end of a list item', function() {
        $inputor.caret('pos', 11);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(5);
        expect($inputor.caret('pos')).toBe(11);
      });

      it('sets the caret position at an empty list item', function() {
        $inputor.caret('pos', 12);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeName).toBe('LI');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(12);
      });

      it('can set the caret position at the start of a nested list item', function() {
        $inputor.caret('pos', 13);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Test');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(13);
      });

      it('sets the caret position at the end of a nested list item', function() {
        $inputor.caret('pos', 17);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Test');
        expect(selection.anchorOffset).toBe(4);
        expect($inputor.caret('pos')).toBe(17);
      });
    });

    describe('BLOCKQUOTE cases', function() {
      beforeEach(function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + 'Hello<blockquote>World</blockquote>'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');
      });

      it('can set the caret position at the start of a blockquote', function() {
        $inputor.caret('pos', 6);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(6);
      });

      it('sets the caret position at the end of a blockquote', function() {
        $inputor.caret('pos', 11);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(5);
        expect($inputor.caret('pos')).toBe(11);
      });
    });

    describe('edge cases', function() {
      it('does not double count nested DIVs', function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + 'Hello<div><div>World</div></div>'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');

        $inputor.caret('pos', 6);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('World');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(6);
      });

      it('ignores <br> at the end of a line of text', function() {
        var contentEditable = '<div id="inputor" contentEditable="true">'
          + '-- <br><div>Test</div>'
          + '</div>';
        var fixture = setFixtures(contentEditable);
        $inputor = fixture.find('#inputor');

        $inputor.caret('pos', 4);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Test');
        expect(selection.anchorOffset).toBe(0);
        expect($inputor.caret('pos')).toBe(4);
      });

      it('sets the caret position when two child nodes match the condition', function() {
        var content = ''
          + '<div id="inputor" contenteditable="true">'
          + 'Hello '
          + '<span>just</span> want'
          + '<ul><li>Hi</li></ul>'
          + '<div>---</div>'
          + '</div>';
        var fixture = setFixtures(content);
        $inputor = fixture.find('#inputor');

        $inputor.caret('pos', 17);
        var selection = window.getSelection();
        expect(selection.anchorNode.nodeValue).toBe('Hi');
        expect(selection.anchorOffset).toBe(1);
        expect($inputor.caret('pos')).toBe(17);
      });
    });
  });
});
